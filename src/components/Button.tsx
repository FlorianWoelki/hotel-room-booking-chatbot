import { MouseEvent } from "react";
import { classNames } from "../util/classNames";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  /**
   * Fires when the button was clicked.
   *
   * @param event The event of this action.
   */
  onClick?: (event: MouseEvent) => void;
}

/**
 * Represents a simple button that is styled properly. This component appends
 * all props excluding `children` and `className` to the first child element
 * of this component.
 *
 * @param props The props of the Button
 * @returns The rendered button.
 */
export const Button: React.FC<Props> = ({
  children,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <button
      type="button"
      className={classNames(
        "text-white bg-blue-500 rounded py-2 px-4 hover:bg-blue-600 transition duration-150 ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
