import { useEffect, useState } from 'react';
import messageJson from '../assets/messages.json';

// Defines the message delay in milliseconds.
const MESSAGE_DELAY = 1750;

export const useMessageTypingEffect = (
  stage: number,
  importedMessages: typeof messageJson,
) => {
  const [queuedMessageIndex, setQueuedMessageIndex] = useState<number>(0);
  const [queuedMessage, setQueuedMessage] = useState<
    string | undefined | null
  >();
  const [messages, setMessages] = useState<string[]>([]);

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

    if (queuedMessageIndex + 1 > stageMessages.messages.length) {
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, queuedMessage]);
      setQueuedMessageIndex((prev) => prev + 1);
    }, MESSAGE_DELAY);
  }, [queuedMessage]);

  return {
    isTyping: queuedMessage !== null,
    messages,
  };
};
