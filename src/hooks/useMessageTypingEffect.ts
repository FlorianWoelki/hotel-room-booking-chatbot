import { useEffect, useState } from 'react';
import messageJson from '../assets/messages.json';

// Defines the message delay in milliseconds.
const MESSAGE_DELAY = 1750;

interface Message {
  value: string;
  type: 'user' | 'bot';
}

export const useMessageTypingEffect = (
  stage: number,
  importedMessages: typeof messageJson,
  recentAnswer?: string,
) => {
  const [queuedMessageIndex, setQueuedMessageIndex] = useState<number>(0);
  const [queuedMessage, setQueuedMessage] = useState<
    string | undefined | null
  >();
  const [messages, setMessages] = useState<Message[]>([]);

  const addTypingMessage = (message: string) => {
    setQueuedMessage(message);
  };

  useEffect(() => {
    const stageMessages = importedMessages.at(stage);
    if (!stageMessages) {
      return;
    }

    setQueuedMessage(stageMessages.messages[queuedMessageIndex] ?? null);
  }, [queuedMessageIndex]);

  useEffect(() => {
    const stageMessages = importedMessages.at(stage);
    if (!stageMessages || !queuedMessage) {
      return;
    }

    /*if (queuedMessageIndex + 1 > stageMessages.messages.length) {
      return;
    }*/

    setTimeout(() => {
      const message = recentAnswer
        ? queuedMessage.replace(/\$userInput/g, recentAnswer)
        : queuedMessage;
      setMessages((prev) => [...prev, { value: message, type: 'bot' }]);
      setQueuedMessageIndex((prev) => prev + 1);
    }, MESSAGE_DELAY);
  }, [queuedMessage]);

  useEffect(() => {
    setQueuedMessageIndex(0);
  }, [stage]);

  return {
    isTyping: queuedMessage !== null,
    messages,
    setMessages,
    addTypingMessage,
  };
};
