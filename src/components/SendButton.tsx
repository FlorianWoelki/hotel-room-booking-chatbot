import { MouseEvent } from 'react';
import { ReactComponent as PaperAirplanIcon } from '../assets/icons/paper-airplane.svg';

interface Props {
  /**
   * When the send button will be disabled.
   */
  disabled?: boolean;
  /**
   * Fires when the button is pressed.
   *
   * @param {MouseEvent} e The event of the click event.
   * @returns {void}
   */
  onClick?: (e: MouseEvent) => void;
}

/**
 * Renders a simple send button that will contain an airplan icon which
 * visualizes the send button.
 *
 * @param {Props} props The passed in send button props.
 * @returns {JSX.Element} The rendered send button component.
 */
export const SendButton: React.FC<Props> = (props: Props): JSX.Element => {
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
