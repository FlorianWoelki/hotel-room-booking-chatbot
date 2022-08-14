import { UserInputTypeProps } from '../../@types/UserInputType';
import { CalendarInputField } from '../CalendarInputField';
import { SendButton } from '../SendButton';

export const Date: React.FC<UserInputTypeProps> = (props): JSX.Element => {
  return (
    <CalendarInputField
      value={
        !props.isWaitingForInput ? 'Please wait' : 'Please select a date range'
      }
      disabled={!props.isWaitingForInput}
    >
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
