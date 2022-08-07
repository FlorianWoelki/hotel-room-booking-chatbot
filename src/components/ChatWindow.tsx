interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const ChatWindow: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className="h-2/3 overflow-y-auto shadow max-w-md w-full rounded p-4">
      {props.children}
    </div>
  );
};
