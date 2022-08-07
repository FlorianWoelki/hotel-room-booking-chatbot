import { useEffect, useState } from 'react';
import messageJson from '../assets/messages.json';

// Defines the message delay in milliseconds.
const MESSAGE_DELAY = 1750;

export const useTypingEffect = (
  stage: number,
  importedMessages: typeof messageJson,
) => {
  const [queuedMessageIndex, setQueuedMessageIndex] = useState<number>(0);
  const [queuedMessage, setQueuedMessage] = useState<string | undefined>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const stageMessages = importedMessages.at(stage);
    if (!stageMessages) {
      return;
    }

    setQueuedMessage(stageMessages.messages[queuedMessageIndex]);
  }, [queuedMessageIndex]);

  useEffect(() => {
    const stageMessages = importedMessages.at(stage);
    if (!stageMessages) {
      return;
    }

    setTimeout(() => {
      if (
        !queuedMessage ||
        queuedMessageIndex + 1 > stageMessages.messages.length
      ) {
        return;
      }

      setMessages((prev) => [...prev, queuedMessage]);
      setQueuedMessageIndex((prev) => prev + 1);
    }, MESSAGE_DELAY);
  }, [queuedMessage]);

  return {
    queuedMessage,
    messages,
  };
};
