interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const ChatWindow: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className="relative h-2/3 shadow max-w-md w-full rounded p-4">
      {props.children}
    </div>
  );
};
