import { UserInputTypeProps } from "../../@types/UserInputType";
import { InputField } from "../InputField";
import { getValidationByStr } from "../../util/inputFieldValidation";
import { forwardRef } from "react";
import { SendButton } from "../SendButton";

interface TextProps {
  /**
   * The input field placeholder that will be used in the input field.
   */
  inputFieldPlaceholder: string;
}

/**
 * Renders a text or input field for the user that is highly specific to the
 * application of the chatbot. This component renders an input field with a
 * send button where the user can type a message in.
 * In addition, this component expects a `ref` that is passed to this
 * component.
 *
 * @returns The rendered Selection list.
 */
export const Text = forwardRef<
  HTMLInputElement,
  UserInputTypeProps & TextProps
>((props, ref): JSX.Element => {
  return (
    <InputField
      ref={ref}
      data-cy="text-input-field"
      validation={getValidationByStr(props.data.userInput.validation)}
      placeholder={
        !props.isWaitingForInput ? "Please wait" : props.inputFieldPlaceholder
      }
      disabled={!props.isWaitingForInput}
      className={props.className}
      onKeyDown={(e, isValid) => {
        if (
          e.key === "Enter" &&
          isValid &&
          ref !== null &&
          typeof ref !== "function"
        ) {
          props.onSubmit?.(props.data!, ref.current!.value);
          ref.current!.value = "";
        }
      }}
    >
      {({ isValid }) => (
        <SendButton
          data-cy="text-send-button"
          disabled={!props.isWaitingForInput || !isValid}
          onClick={() => {
            if (ref !== null && typeof ref !== "function") {
              props.onSubmit?.(props.data!, ref.current!.value);
              ref.current!.value = "";
            }
          }}
        ></SendButton>
      )}
    </InputField>
  );
});
