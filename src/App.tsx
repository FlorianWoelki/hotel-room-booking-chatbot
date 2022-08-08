import { useEffect, useRef, useState } from 'react';
import { ReactComponent as PaperAirplanIcon } from './assets/icons/paper-airplane.svg';
import importedMessages from './assets/messages.json';
import { ChatMessage } from './components/ChatMessage';
import { ChatWindow } from './components/ChatWindow';
import { InputField } from './components/InputField';
import { TypingIndicator } from './components/TypingIndicator';
import { useMessageTypingEffect } from './hooks/useMessageTypingEffect';

const App = () => {
  const [stage, setStage] = useState<number>(0);
  const [isWaitingForInput, setIsWaitingForInput] = useState<boolean>(false);
  const [recentAnswer, setRecentAnswer] = useState<string | undefined>();

  const inputFieldRef = useRef<HTMLInputElement | null>(null);

  const { isTyping, messages, setMessages } = useMessageTypingEffect(
    stage,
    importedMessages,
    recentAnswer,
  );

  useEffect(() => {
    if (!isTyping && inputFieldRef.current) {
      setRecentAnswer(undefined);
      setIsWaitingForInput(true);
      setTimeout(() => {
        inputFieldRef.current!.focus();
      });
    }
  }, [isTyping]);

  const submitAnswer = (message: string): void => {
    setRecentAnswer(message);
    setMessages((prev) => [...prev, { value: message, type: 'user' }]);
    setStage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center h-screen mx-8 antialiased">
      <ChatWindow>
        <div className="space-y-2">
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
        {importedMessages.at(stage)?.userInput.type === 'text' && (
          <InputField
            ref={inputFieldRef}
            placeholder={
              !isWaitingForInput
                ? 'Please wait'
                : importedMessages.at(stage)?.userInput.placeholder
            }
            disabled={!isWaitingForInput}
            className="absolute left-0 bottom-0 mb-8 right-0 flex mx-auto w-11/12"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputFieldRef.current) {
                submitAnswer(inputFieldRef.current.value);
              }
            }}
          >
            <button
              type="button"
              disabled={!isWaitingForInput}
              className="absolute right-0 mr-2 text-white bg-blue-500 p-2 rounded-full transition duration-150 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={() => {
                if (inputFieldRef.current) {
                  submitAnswer(inputFieldRef.current.value);
                }
              }}
            >
              <PaperAirplanIcon className="w-5 h-5" />
            </button>
          </InputField>
        )}
      </ChatWindow>
    </div>
  );
};

export default App;
