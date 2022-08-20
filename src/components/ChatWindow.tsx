interface Props {
  /**
   * The children that will be rendered inside the chat window.
   */
  children: React.ReactNode[] | React.ReactNode;
}

/**
 * Will render a chat window that is flexible enough to adapt to smaller
 * screens. The passed in children will be inside of the chat window.
 *
 * @param {Props} props The props that will be passed to the chat window.
 * @returns {JSX.Element} The rendered chat window.
 */
export const ChatWindow: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div
      data-cy="chat-window"
      className="flex flex-col md:h-2/3 h-5/6 shadow max-w-md w-full rounded p-4"
    >
      {props.children}
    </div>
  );
};
