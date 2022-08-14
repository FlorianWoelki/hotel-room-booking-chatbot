import { MouseEvent } from 'react';
import { ReactComponent as PaperAirplanIcon } from '../assets/icons/paper-airplane.svg';

interface SendButtonProps {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export const SendButton: React.FC<SendButtonProps> = (props): JSX.Element => {
  return (
    <button
      type="button"
      className="absolute right-0 mr-2 text-white bg-blue-500 p-2 rounded-full transition duration-150 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      {...props}
    >
      <PaperAirplanIcon className="w-5 h-5" />
    </button>
  );
};
