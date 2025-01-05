import { UserInputTypeProps } from "../../@types/UserInputType";
import { classNames } from "../../util/classNames";
import { Button } from "../Button";

/**
 * Renders a link user button that is highly specific to the application
 * of the chatbot. This component renders a button which contains a link to the
 * specified prop `data.userInput.href`.
 *
 * @param props The link props.
 * @returns The rendered Link.
 */
export const Link: React.FC<UserInputTypeProps> = (
  props: UserInputTypeProps,
): JSX.Element => {
  return (
    <div
      data-cy="user-input-link"
      className={classNames(
        "flex flex-wrap items-center justify-center gap-2 bg-gray-100 p-4 rounded shadow",
        props.className,
      )}
    >
      {!props.isWaitingForInput ? (
        <p className="text-gray-500">Please wait</p>
      ) : (
        <a href={props.data?.userInput.href} target="_blank">
          <Button
            onClick={() =>
              props.onSubmit?.(props.data!, props.data!.userInput.placeholder!)
            }
          >
            {props.data?.userInput.placeholder}
          </Button>
        </a>
      )}
    </div>
  );
};
