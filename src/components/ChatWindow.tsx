interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const ChatWindow: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className="relative md:h-2/3 h-5/6 shadow max-w-md w-full rounded p-4">
      {props.children}
    </div>
  );
};
