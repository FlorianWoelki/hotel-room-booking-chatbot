import { UserInputTypeProps } from "../../@types/UserInputType";
import { CalendarInputField } from "../CalendarInputField";
import { SendButton } from "../SendButton";

interface DateProps {
  value?: string;
}

/**
 * Renders a date user input field that is highly specific to the application
 * of the chatbot. This component renders an input field that can handle
 * different date ranges.
 *
 * @param props The date props.
 * @returns The rendered Date.
 */
export const Date: React.FC<UserInputTypeProps & DateProps> = (
  props: UserInputTypeProps & DateProps,
): JSX.Element => {
  /**
   * Returns `Please wait` when the prop `isWaitingForInput` is false and
   * `Please select a date range` when it is true.
   *
   * @returns The value for the calendar input field.
   */
  const getValue = (): string => {
    if (props.value) {
      return props.value;
    }

    return !props.isWaitingForInput
      ? "Please wait"
      : "Please select a date range";
  };

  return (
    <CalendarInputField value={getValue()} disabled={!props.isWaitingForInput}>
      {({ value, isValid, setDisplayValue }) => (
        <SendButton
          data-cy="date-send-button"
          disabled={!props.isWaitingForInput || !isValid}
          onClick={(e) => {
            e.stopPropagation();
            props.onSubmit?.(props.data!, value);
            setDisplayValue("");
          }}
        ></SendButton>
      )}
    </CalendarInputField>
  );
};
