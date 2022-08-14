export interface Selection {
  value: string;
  followMessageId: string;
}

export type MessageType =
  | 'text'
  | 'selection'
  | 'freeText'
  | 'terminate'
  | 'date'
  | 'link';

export interface MessageData {
  id: string;
  messages: string[];
  userInput: {
    type: string;
    followMessageId?: string;
    placeholder?: string;
    validation?: string;
    href?: string;
    selections?: Selection[];
  };
}
