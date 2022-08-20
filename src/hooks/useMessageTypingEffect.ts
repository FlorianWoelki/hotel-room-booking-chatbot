import { useEffect, useState } from 'react';
import messageJson from '../assets/messages.json';

// Defines the message delay in milliseconds.
const MESSAGE_DELAY = import.meta.env.DEV ? 100 : 1750;

interface Message {
  /**
   * Defines the value of the message.
   */
  value: string;
  /**
   * The type of the message.
   */
  type: 'user' | 'bot';
}

interface MessageTypingEffect {
  /**
   * When the bot is typing.
   */
  isTyping: boolean;
  /**
   * All the messages that are currently displayed.
   */
  messages: Message[];
  /**
   * Sets the messages of the hooks.
   *
   * @param {React.SetStateAction<Message[]>} messages The new messages that will be used for the typing effect.
   * @return {void}
   */
  setMessages: (messages: React.SetStateAction<Message[]>) => void;
  /**
   * Adds a typing message that will optionally transformed and added to the
   * queue of all the messages.
   *
   * @param {string | null} message The message itself.
   * @returns {void}
   */
  addTypingMessage: (message: string | null) => void;
}

/**
 * This hook can be used to completely simualte a messaging conversation.
 * It will simulate a typing effect and will always set the current message,
 * if there is a new one.
 *
 * For that the algorithm will do the following:
 * 1. Get all the stage messages of the current stage.
 * 2. Add a timeout that will indicate the typing and then add the message
 *    to the `messages` state. It will increase the queue index by one.
 * 3. Adds a new typing message from the stage messages.
 * 4. When `stage` will be changed the queue index will be reset because all
 *    the messages of the new stage will be used.
 *
 * @param {number} stage The current stage of the messaging.
 * @param {Object} importedMessages The message data in json format.
 * @param {Function} [transformMessage] When the message needs to be transformed.
 * @returns {MessageTypingEffect} The data for the message typing effect.
 */
export const useMessageTypingEffect = (
  stage: number,
  importedMessages: typeof messageJson,
  transformMessage?: (message: string) => string,
): MessageTypingEffect => {
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
