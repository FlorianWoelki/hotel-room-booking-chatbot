import { useEffect, useRef, useState } from 'react';
import { MessageData, MessageType, Selection } from './@types/Message';

import importedMessages from './assets/messages.json';
import { createChatbot } from './chatbot';
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

const chatbot = createChatbot();

const App = () => {
  const [stage, setStage] = useState<number>(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [recentAnswer, setRecentAnswer] = useState<string | undefined>();

  /**
   * Defines the data that was defined by the user. This state is used to
   * personalize the chatbot through placeholder values like `$firstname`.
   */
  const [placeholderData, setPlaceholderData] = useState<{
    [key: string]: any;
  }>({});

  /**
   * This data will contain all the taken steps from the user.
   * This can be used to follow up with database insertion.
   */
  const [savedData, setSavedData] = useState<{ [key: string]: any }>({});

  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const textMessagesRef = useRef<HTMLDivElement | null>(null);

  /**
   * This function will transform in a message and check if a used placeholder
   * is in the message. If it is, it will be replaced with the actual value
   * that was defined by the user.
   *
   * @param {string} message The message that will be transformed.
   * @returns {string} The transformed message.
   */
  const transformMessage = (message: string): string => {
    if (recentAnswer) {
      const regex = /\$\w+/g;
      const matchedPlaceholder = message.match(regex);

      if (matchedPlaceholder && matchedPlaceholder.length > 0) {
        const placeholder = matchedPlaceholder[0];
        if (placeholderData[placeholder] !== undefined) {
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

  useEffect(() => {
    if (!textMessagesRef.current) {
      return;
    }

    // Sets a timeout to fix issue of clipping the scroll to the bottom.
    setTimeout(() => {
      textMessagesRef.current!.scrollTop =
        textMessagesRef.current!.scrollHeight;
    });
  }, [messages]);

  useEffect(() => {
    if (!isTyping) {
      setRecentAnswer(undefined);
      setIsWaitingForInput(true);
      // Sets timeout to really focus the input field.
      // Could be the case that it is not focusable in the beginning.
      setTimeout(() => {
        if (inputFieldRef.current) {
          inputFieldRef.current.focus();
        }
      });
    } else {
      setIsWaitingForInput(false);
    }
  }, [isTyping]);

  /**
   * This function will submit the answer and process a possible response.
   * Whenever the user input type is of type `freeText`, it will use the chatbot
   * functionality to chat with the user.
   * If not, it will try to find the follow up message id that will be used
   * to display the next message.
   *
   * @param {MessageData} data The data of the message
   * @param {string | Selection} value The message value or selected option.
   * @returns {void}
   */
  const submitAnswer = (data: MessageData, value: string | Selection): void => {
    setIsWaitingForInput(false);
    const message = typeof value === 'string' ? value : value.value;

    setSavedData((prev) => ({ ...prev, [data.id]: message }));
    setMessages((prev) => [...prev, { value: message, type: 'user' }]);

    if (data.userInput.type === 'terminate') {
      return;
    }

    if (data.userInput.type === 'freeText') {
      const response = chatbot.getResponse(message);
      addTypingMessage(response);
      return;
    }

    let foundMessageIndex = -1;

    // Whenever the `followMessageId` is in the value object directly.
    if (
      !data.userInput.followMessageId &&
      typeof value === 'object' &&
      data.userInput.type === 'selection'
    ) {
      foundMessageIndex = importedMessages.findIndex(
        (message) => message.id === value.followMessageId,
      );
    }

    // Whenever the `followMessageId` is in the user input.
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

  /**
   * Gets the user input by checking on the `userInputType` in the message data.
   * This function will return the correct component that can be used to
   * create a user input field.
   *
   * @returns {JSX.Element} The rendered user input component.
   */
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

    switch (userInputType) {
      case 'text':
      case 'freeText':
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
      case 'selection':
        return (
          <SelectionComp
            isWaitingForInput={isWaitingForInput}
            className={containerBottom}
            data={data}
            onSubmit={submitAnswer}
          />
        );
      case 'date':
        return (
          <Date
            isWaitingForInput={isWaitingForInput}
            data={data}
            onSubmit={submitAnswer}
          />
        );
      case 'link':
        return (
          <Link
            className={containerBottom}
            isWaitingForInput={isWaitingForInput}
            data={data}
            onSubmit={submitAnswer}
          />
        );
      case 'terminate':
        return <Terminate />;
      default:
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
