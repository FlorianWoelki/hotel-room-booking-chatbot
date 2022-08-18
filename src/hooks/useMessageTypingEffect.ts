import { useEffect, useState } from 'react';
import messageJson from '../assets/messages.json';

// Defines the message delay in milliseconds.
const MESSAGE_DELAY = import.meta.env.DEV ? 100 : 1750;

interface Message {
  value: string;
  type: 'user' | 'bot';
}

export const useMessageTypingEffect = (
  stage: number,
  importedMessages: typeof messageJson,
  transformMessage?: (message: string) => string,
) => {
  const [queuedMessageIndex, setQueuedMessageIndex] = useState<number>(0);
  const [queuedMessage, setQueuedMessage] = useState<
    string | undefined | null
  >();
  const [messages, setMessages] = useState<Message[]>([]);

  const addTypingMessage = (message: string | null) => {
    if (message && transformMessage) {
      setQueuedMessage(transformMessage(message));
      return;
    }

    setQueuedMessage(message);
  };

  useEffect(() => {
    const stageMessages = importedMessages.at(stage);
    if (!stageMessages) {
      return;
    }

    addTypingMessage(stageMessages.messages[queuedMessageIndex] ?? null);
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
      setMessages((prev) => [...prev, { value: queuedMessage, type: 'bot' }]);
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
