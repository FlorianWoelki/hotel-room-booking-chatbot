import { UserInputTypeProps } from '../../@types/UserInputType';
import { CalendarInputField } from '../CalendarInputField';
import { SendButton } from '../SendButton';

interface DateProps {
  value?: string;
}

export const Date: React.FC<UserInputTypeProps & DateProps> = (
  props,
): JSX.Element => {
  const getValue = (): string => {
    if (props.value) {
      return props.value;
    }

    return !props.isWaitingForInput
      ? 'Please wait'
      : 'Please select a date range';
  };

  return (
    <CalendarInputField value={getValue()} disabled={!props.isWaitingForInput}>
      {({ value, isValid, setDisplayValue }) => (
        <SendButton
          disabled={!props.isWaitingForInput || !isValid}
          onClick={(e) => {
            e.stopPropagation();
            props.onSubmit?.(props.data!, value);
            setDisplayValue('');
          }}
        ></SendButton>
      )}
    </CalendarInputField>
  );
};
