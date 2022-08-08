import { forwardRef, KeyboardEvent } from 'react';
import { classNames } from '../util/classNames';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <div className={classNames('relative flex items-center', className)}>
        <input
          ref={ref}
          type="text"
          className="block py-4 pl-6 pr-12 w-full text-gray-900 sm:text-md shadow rounded-full border border-gray-100 focus:outline-none transition duration-150 ease-in-out focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          {...props}
        />
        {children}
      </div>
    );
  },
);
