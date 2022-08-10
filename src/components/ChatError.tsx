interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export const ChatError: React.FC<Props> = (props): JSX.Element => {
  return <p className="text-center text-red-500 pt-4">{props.children}</p>;
};
