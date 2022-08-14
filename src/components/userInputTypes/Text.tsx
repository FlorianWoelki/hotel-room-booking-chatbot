import { UserInputTypeProps } from '../../@types/UserInputType';
import { InputField } from '../InputField';
import { getValidationByStr } from '../../util/inputFieldValidation';
import { forwardRef } from 'react';
import { SendButton } from '../SendButton';

interface TextProps {
  inputFieldPlaceholder: string;
}

export const Text = forwardRef<
  HTMLInputElement,
  UserInputTypeProps & TextProps
>((props, ref): JSX.Element => {
  return (
    <InputField
      ref={ref}
      validation={getValidationByStr(props.data.userInput.validation)}
      placeholder={
        !props.isWaitingForInput ? 'Please wait' : props.inputFieldPlaceholder
      }
      disabled={!props.isWaitingForInput}
      className={props.className}
      onKeyDown={(e, isValid) => {
        if (
          e.key === 'Enter' &&
          isValid &&
          ref !== null &&
          typeof ref !== 'function'
        ) {
          props.onSubmit?.(props.data!, ref.current!.value);
          ref.current!.value = '';
        }
      }}
    >
      {({ isValid }) => (
        <SendButton
          disabled={!props.isWaitingForInput || !isValid}
          onClick={() => {
            if (ref !== null && typeof ref !== 'function') {
              props.onSubmit?.(props.data!, ref.current!.value);
              ref.current!.value = '';
            }
          }}
        ></SendButton>
      )}
    </InputField>
  );
});
