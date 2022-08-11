import { MouseEvent } from 'react';
import { classNames } from '../util/classNames';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      type="button"
      className={classNames(
        'text-white bg-blue-500 rounded py-2 px-4 hover:bg-blue-600 transition duration-150 ease-in-out',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
