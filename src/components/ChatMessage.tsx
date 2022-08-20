import { classNames } from '../util/classNames';

interface Props {
  /**
   * The children that will be rendered inside the component.
   */
  children: React.ReactNode;
  /**
   * Defines where the chat message will be displayed.
   * Defaults to `left`.
   */
  position?: 'left' | 'right';
}

/**
 * Renders a chat message in a given position. The passed in children will be
 * used to render inside the styled message and will mostly contain text.
 *
 * @param {Props} props The passed in props of the component.
 * @returns {JSX.Element} The rendered chat message.
 */
export const ChatMessage: React.FC<Props> = ({
  position = 'left',
  ...props
}: Props): JSX.Element => {
  return (
    <div className={classNames('flex', position === 'right' && 'justify-end')}>
      <div
        className={classNames(
          'rounded px-4 py-2 inline-block',
          position === 'left'
            ? 'bg-gray-100 text-gray-500'
            : 'bg-blue-500 text-white',
        )}
      >
        <span>{props.children}</span>
      </div>
    </div>
  );
};
