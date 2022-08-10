import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ReactComponent as PaperAirplanIcon } from './assets/icons/paper-airplane.svg';
import importedMessages from './assets/messages.json';
import { getResponse } from './chatbot';
import { Button } from './components/Button';
import { ChatError } from './components/ChatError';
import { ChatMessage } from './components/ChatMessage';
import { ChatWindow } from './components/ChatWindow';
import { InputField } from './components/InputField';
import { TypingIndicator } from './components/TypingIndicator';
import { useMessageTypingEffect } from './hooks/useMessageTypingEffect';
import { classNames } from './util/classNames';
import { getValidationByStr } from './util/inputFieldValidation';

interface Selection {
  value: string;
  followMessageId: string;
}

type MessageType = 'text' | 'selection' | 'freeText' | 'terminate' | 'date';

interface MessageData {
  id: string;
  messages: string[];
  userInput: {
    type: string;
    followMessageId?: string;
    placeholder?: string;
    selections?: Selection[];
  };
}

const App = () => {
  const [stage, setStage] = useState<number>(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [recentAnswer, setRecentAnswer] = useState<string | undefined>();
  const [savedData, setSavedData] = useState<{ [key: string]: any }>({});

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const textMessagesRef = useRef<HTMLDivElement | null>(null);

  const transformMessage = (message: string): string => {
    if (recentAnswer) {
      const regex = /\$\w+/g;
      const matchedPlaceholder = message.match(regex);

      if (matchedPlaceholder && matchedPlaceholder.length > 0) {
        const placeholder = matchedPlaceholder[0];
        if (isKeyInSavedData(placeholder)) {
          message = message.replace(regex, savedData[placeholder]);
        } else {
          message = message.replace(regex, recentAnswer);
          setSavedData((prev) => ({
            ...prev,
            [placeholder]: recentAnswer,
          }));
        }
      }
    }

    return message;
  };

  const { isTyping, messages, setMessages, addTypingMessage } =
    useMessageTypingEffect(stage, importedMessages, transformMessage);

  const isKeyInSavedData = (key: string): boolean => {
    return savedData[key] !== undefined;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE');
  };

  useEffect(() => {
    if (!textMessagesRef.current) {
      return;
    }

    setTimeout(() => {
      textMessagesRef.current!.scrollTop =
        textMessagesRef.current!.scrollHeight;
    });
  }, [messages]);

  useEffect(() => {
    if (!isTyping && inputFieldRef.current) {
      setRecentAnswer(undefined);
      setIsWaitingForInput(true);
      setTimeout(() => {
        inputFieldRef.current!.focus();
      });
    }
  }, [isTyping]);

  const submitAnswer = (data: MessageData, value: string | Selection): void => {
    const message = typeof value === 'string' ? value : value.value;

    setMessages((prev) => [...prev, { value: message, type: 'user' }]);

    if (data.userInput.type === 'terminate') {
      return;
    }

    if (data.userInput.type === 'freeText') {
      const response = getResponse(message);
      addTypingMessage(response);
      return;
    }

    let foundMessageIndex = -1;
    if (
      !data.userInput.followMessageId &&
      typeof value === 'object' &&
      data.userInput.type === 'selection'
    ) {
      foundMessageIndex = importedMessages.findIndex(
        (message) => message.id === value.followMessageId,
      );
    }

    if (foundMessageIndex === -1) {
      foundMessageIndex = importedMessages.findIndex(
        (message) => message.id === data.userInput.followMessageId,
      );
      if (foundMessageIndex === -1) {
        console.error(
          `Submitted follow message id '${data.userInput.followMessageId}' was not found.`,
        );
        return;
      }
    }

    setRecentAnswer(message);
    setStage(foundMessageIndex);
  };

  const submitSelection = (data: MessageData, selection: Selection): void => {
    submitAnswer(data, selection);
  };

  const getUserInput = (): JSX.Element => {
    const containerBottom = classNames('pt-4 flex mx-auto w-full');
    const data = importedMessages.at(stage);
    const userInputType = data?.userInput.type as MessageType;

    if (!data) {
      return (
        <ChatError>
          Data is not defined. Please check your `messages.json` file.
        </ChatError>
      );
    }

    if (userInputType === 'text' || userInputType === 'freeText') {
      return (
        <InputField
          ref={inputFieldRef}
          validation={getValidationByStr(data.userInput.validation)}
          placeholder={
            !isWaitingForInput
              ? 'Please wait'
              : importedMessages.at(stage)?.userInput.placeholder
          }
          disabled={!isWaitingForInput}
          className={containerBottom}
          onKeyDown={(e, isValid) => {
            if (e.key === 'Enter' && inputFieldRef.current && isValid) {
              submitAnswer(data, inputFieldRef.current.value);
              inputFieldRef.current.value = '';
            }
          }}
        >
          {({ isValid }) => (
            <button
              type="button"
              disabled={!isWaitingForInput || !isValid}
              className="absolute right-0 mr-2 text-white bg-blue-500 p-2 rounded-full transition duration-150 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={() => {
                if (inputFieldRef.current) {
                  submitAnswer(data, inputFieldRef.current.value);
                  inputFieldRef.current.value = '';
                }
              }}
            >
              <PaperAirplanIcon className="w-5 h-5" />
            </button>
          )}
        </InputField>
      );
    } else if (userInputType === 'selection') {
      return (
        <div
          className={classNames(
            'flex flex-wrap items-center justify-center gap-2 bg-gray-100 p-4 rounded shadow',
            containerBottom,
          )}
        >
          {isTyping ? (
            <p className="text-gray-500">Please wait</p>
          ) : (
            data?.userInput.selections?.map((selection, index) => (
              <Button
                key={index}
                onClick={() => submitSelection(data, selection)}
              >
                {selection.value}
              </Button>
            ))
          )}
        </div>
      );
    } else if (userInputType === 'date') {
      return (
        <div
          className={classNames(containerBottom, 'items-center justify-center')}
        >
          <Button onClick={() => setIsCalendarOpen((prev) => !prev)}>
            {startDate.getTime() === endDate?.getTime()
              ? 'Select a date'
              : `${formatDate(startDate)} - ${endDate && formatDate(endDate)}`}
          </Button>
          {isCalendarOpen && (
            <DatePicker
              inline
              selected={startDate}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start!);
                setEndDate(end!);
              }}
            />
          )}
        </div>
      );
    }

    return (
      <ChatError>
        User Input type not found. Please check your `messages.json` file.
      </ChatError>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen mx-8 antialiased">
      <ChatWindow>
        <div
          ref={textMessagesRef}
          className="flex-1 space-y-2 overflow-y-auto max-h-full pb-4"
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              position={message.type === 'bot' ? 'left' : 'right'}
            >
              {message.value}
            </ChatMessage>
          ))}
          {isTyping && <TypingIndicator></TypingIndicator>}
        </div>
        {getUserInput()}
      </ChatWindow>
    </div>
  );
};

export default App;
