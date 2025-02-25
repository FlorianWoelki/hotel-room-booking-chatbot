import * as yup from "yup";
import React, {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { classNames } from "../util/classNames";

interface ChildrenCallback {
  /**
   * If the input field is valid.
   */
  isValid?: boolean;
}

interface Props {
  /**
   * When the input field is disabled.
   */
  disabled?: boolean;
  /**
   * Sets the placeholder of the input field.
   */
  placeholder?: string;
  /**
   * Add additional classes to the root element of the component.
   */
  className?: string;
  /**
   * Which kind of validation schema will be used.
   */
  validation?: yup.AnySchema;
  /**
   * Defines the children that will be rendered inside of the input field
   * component.
   *
   * @param childrenCallback The callback when the children will be rendered.
   * @returns The children that will be rendered.
   */
  children?: (childrenCallback: ChildrenCallback) => React.ReactNode;
  /**
   * Fires when a key was down in the input field.
   *
   * @param event The keyboard event.
   * @param isValid If the input is valid.
   */
  onKeyDown?: (event: KeyboardEvent, isValid?: boolean) => void;
}

/**
 * This component can expect a `ref` that will be forwarded to the input
 * element itself. With that you can get the input or manipulate the field
 * directly.
 *
 * The component renders an input field in a parent element that can be rendered
 * with an extra children. In addition, it renders a validation reason error,
 * when the specific validation is not fulfilled.
 *
 * @param props The input field props.
 * @returns The rendered input field.
 */
export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, children, onKeyDown, ...props }, ref): JSX.Element => {
    const [isValidationValid, setIsValidationValid] = useState<boolean>(
      props.validation === undefined,
    );
    const [validationReason, setValidationReason] = useState<string>("");

    useEffect(() => {
      // Resets the validation.
      setIsValidationValid(props.validation === undefined);
      setValidationReason("");
    }, [props.validation]);

    /**
     * Handles the change of the input field. This function will validate the
     * current input of the input field and sets the `isValid` property in the
     * children callback.
     *
     * @param event The change event.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (!props.validation) {
        setIsValidationValid(true);
        return;
      }

      props.validation
        .validate(event.target.value)
        .then(() => {
          setValidationReason("");
          setIsValidationValid(true);
        })
        .catch((reason) => {
          setValidationReason(reason.message);
          setIsValidationValid(false);
        });
    };

    return (
      <div className={classNames("relative flex items-center", className)}>
        {validationReason && (
          <p className="text-red-500 -mt-6 text-center text-sm absolute top-0 inset-x-0 rounded bg-red-100 py-2">
            {validationReason}
          </p>
        )}
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
