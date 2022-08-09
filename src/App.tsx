import { useEffect, useRef, useState } from 'react';
import { ReactComponent as PaperAirplanIcon } from './assets/icons/paper-airplane.svg';
import importedMessages from './assets/messages.json';
import { getResponse } from './chatbot';
import { Button } from './components/Button';
import { ChatMessage } from './components/ChatMessage';
import { ChatWindow } from './components/ChatWindow';
import { InputField } from './components/InputField';
import { TypingIndicator } from './components/TypingIndicator';
import { useMessageTypingEffect } from './hooks/useMessageTypingEffect';
import { classNames } from './util/classNames';

interface Selection {
  value: string;
  clickMessageId: string;
}

type MessageType = 'text' | 'selection' | 'freeText';

const App = () => {
  const [stage, setStage] = useState<number>(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [recentAnswer, setRecentAnswer] = useState<string | undefined>();

  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const textMessagesRef = useRef<HTMLDivElement | null>(null);

  const { isTyping, messages, setMessages, addTypingMessage } =
    useMessageTypingEffect(stage, importedMessages, recentAnswer);

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

  const submitAnswer = (type: MessageType, message: string): void => {
    setMessages((prev) => [...prev, { value: message, type: 'user' }]);

    if (type === 'freeText') {
      const response = getResponse(message);
      addTypingMessage(response);
      return;
    }

    setRecentAnswer(message);
    setStage((prev) => prev + 1);
  };

  const submitSelection = (selection: Selection): void => {
    const foundMessageIndex = importedMessages.findIndex(
      (message) => message.id === selection.clickMessageId,
    );
    if (foundMessageIndex === -1) {
      console.error(
        `Submitted selection with click message id '${selection.clickMessageId}' was not found.`,
      );
    }

    submitAnswer('selection', selection.value);
    setStage(foundMessageIndex);
  };

  const getUserInput = (): JSX.Element => {
    const containerBottom = classNames('pt-4 flex mx-auto w-full');
    const data = importedMessages.at(stage);
    const userInputType = data?.userInput.type as MessageType;

    if (userInputType === 'text' || userInputType === 'freeText') {
      return (
        <InputField
          ref={inputFieldRef}
          placeholder={
            !isWaitingForInput
              ? 'Please wait'
              : importedMessages.at(stage)?.userInput.placeholder
          }
          disabled={!isWaitingForInput}
          className={containerBottom}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputFieldRef.current) {
              submitAnswer(userInputType, inputFieldRef.current.value);
              inputFieldRef.current.value = '';
            }
          }}
        >
          <button
            type="button"
            disabled={!isWaitingForInput}
            className="absolute right-0 mr-2 text-white bg-blue-500 p-2 rounded-full transition duration-150 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={() => {
              if (inputFieldRef.current) {
                submitAnswer(userInputType, inputFieldRef.current.value);
                inputFieldRef.current.value = '';
              }
            }}
          >
            <PaperAirplanIcon className="w-5 h-5" />
          </button>
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
              <Button key={index} onClick={() => submitSelection(selection)}>
                {selection.value}
              </Button>
            ))
          )}
        </div>
      );
    }

    return (
      <p className="text-center text-red-500">
        User Input type not found. Please check your `messages.json` file.
      </p>
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
