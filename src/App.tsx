import { useEffect, useRef, useState } from 'react';
import { MessageData, MessageType, Selection } from './@types/Message';

import importedMessages from './assets/messages.json';
import { getResponse } from './chatbot';
import { ChatError } from './components/ChatError';
import { ChatMessage } from './components/ChatMessage';
import { ChatWindow } from './components/ChatWindow';
import { TypingIndicator } from './components/TypingIndicator';
import { Date } from './components/userInputTypes/Date';
import { Link } from './components/userInputTypes/Link';
import { Selection as SelectionComp } from './components/userInputTypes/Selection';
import { Terminate } from './components/userInputTypes/Terminate';
import { Text } from './components/userInputTypes/Text';
import { useMessageTypingEffect } from './hooks/useMessageTypingEffect';
import { classNames } from './util/classNames';

const App = () => {
  const [stage, setStage] = useState<number>(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [recentAnswer, setRecentAnswer] = useState<string | undefined>();
  const [placeholderData, setPlaceholderData] = useState<{
    [key: string]: any;
  }>({});
  const [savedData, setSavedData] = useState<{ [key: string]: any }>({});

  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const textMessagesRef = useRef<HTMLDivElement | null>(null);

  const transformMessage = (message: string): string => {
    if (recentAnswer) {
      const regex = /\$\w+/g;
      const matchedPlaceholder = message.match(regex);

      if (matchedPlaceholder && matchedPlaceholder.length > 0) {
        const placeholder = matchedPlaceholder[0];
        if (isKeyInSavedData(placeholder)) {
          message = message.replace(regex, placeholderData[placeholder]);
        } else {
          message = message.replace(regex, recentAnswer);
          setPlaceholderData((prev) => ({
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
    return placeholderData[key] !== undefined;
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
    if (!isTyping) {
      setRecentAnswer(undefined);
      setIsWaitingForInput(true);
      setTimeout(() => {
        if (inputFieldRef.current) {
          inputFieldRef.current.focus();
        }
      });
    } else {
      setIsWaitingForInput(false);
    }
  }, [isTyping]);

  const submitAnswer = (data: MessageData, value: string | Selection): void => {
    const message = typeof value === 'string' ? value : value.value;

    setSavedData((prev) => ({ ...prev, [data.id]: message }));
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
        <Text
          ref={inputFieldRef}
          className={containerBottom}
          isWaitingForInput={isWaitingForInput}
          inputFieldPlaceholder={
            importedMessages.at(stage)?.userInput.placeholder ?? ''
          }
          data={data}
          onSubmit={submitAnswer}
        />
      );
    } else if (userInputType === 'selection') {
      return (
        <SelectionComp
          isWaitingForInput={isWaitingForInput}
          className={containerBottom}
          data={data}
          onSubmit={submitAnswer}
        />
      );
    } else if (userInputType === 'date') {
      return (
        <Date
          isWaitingForInput={isWaitingForInput}
          data={data}
          onSubmit={submitAnswer}
        />
      );
    } else if (userInputType === 'link') {
      return (
        <Link
          className={containerBottom}
          isWaitingForInput={isWaitingForInput}
          data={data}
          onSubmit={submitAnswer}
        />
      );
    } else if (userInputType === 'terminate') {
      return <Terminate />;
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
