import { MessageData, Selection } from './Message';

export interface UserInputTypeProps {
  data: MessageData;
  isWaitingForInput: boolean;
  onSubmit: (data: any, message: string | Selection) => void;
  className?: string;
  isTyping?: boolean;
}
