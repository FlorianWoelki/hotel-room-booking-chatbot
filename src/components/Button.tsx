import { MouseEvent } from 'react';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onClick?: (event: MouseEvent) => void;
}

export const Button: React.FC<Props> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <button
      type="button"
      className="text-white bg-blue-500 rounded py-2 px-4 hover:bg-blue-600 transition duration-150 ease-in-out"
      {...props}
    >
      {children}
    </button>
  );
};
