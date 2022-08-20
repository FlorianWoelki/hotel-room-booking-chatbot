interface Props {
  /**
   * The children of the displayed chat error.
   */
  children?: React.ReactNode | React.ReactNode[];
}

/**
 * Will render a simple red-colored chat error that can be customized through
 * the passed in children.
 *
 * @param {Props} props The props of the chat error.
 * @returns {JSX.Element} The rendered chat error.
 */
export const ChatError: React.FC<Props> = (props: Props): JSX.Element => {
  return <p className="text-center text-red-500 pt-4">{props.children}</p>;
};
