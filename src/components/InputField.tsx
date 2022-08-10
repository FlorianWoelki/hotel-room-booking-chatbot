import * as yup from 'yup';
import { ChangeEvent, forwardRef, KeyboardEvent, useState } from 'react';
import { classNames } from '../util/classNames';

interface ChildrenCallback {
  isValid?: boolean;
}

interface Props {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  children?: (childrenCallback: ChildrenCallback) => React.ReactNode;
  validation?: yup.AnySchema;
  onKeyDown?: (event: KeyboardEvent, isValid?: boolean) => void;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, children, onKeyDown, ...props }, ref): JSX.Element => {
    const [isValidationValid, setIsValidationValid] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (!props.validation) {
        setIsValidationValid(true);
        return;
      }

      props.validation
        .validate(event.target.value)
        .then(() => setIsValidationValid(true))
        .catch(() => setIsValidationValid(false));
    };

    return (
      <div className={classNames('relative flex items-center', className)}>
        <input
          ref={ref}
          type="text"
          className="block py-4 pl-6 pr-12 w-full text-gray-900 sm:text-md shadow rounded-full border border-gray-100 focus:outline-none transition duration-150 ease-in-out focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          onChange={handleChange}
          onKeyDown={(e) => onKeyDown?.(e, isValidationValid)}
          {...props}
        />
        {children?.({ isValid: isValidationValid })}
      </div>
    );
  },
);
