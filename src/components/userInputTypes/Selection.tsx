import { UserInputTypeProps } from '../../@types/UserInputType';
import { classNames } from '../../util/classNames';
import { Button } from '../Button';

/**
 * Renders a selection list for the user that is highly specific to the
 * application of the chatbot. This component renders multiple buttons that are
 * based on `data.userInput.selections`.
 *
 * @param {UserInputTypeProps} props The Selection props.
 * @returns {JSX.Element} The rendered Selection list.
 */
export const Selection: React.FC<UserInputTypeProps> = (
  props: UserInputTypeProps,
): JSX.Element => {
  return (
    <div
      className={classNames(
        'flex flex-wrap items-center justify-center gap-2 bg-gray-100 p-4 rounded shadow',
        props.className,
      )}
    >
      {!props.isWaitingForInput ? (
        <p className="text-gray-500">Please wait</p>
      ) : (
        props.data?.userInput.selections?.map((selection, index) => (
          <Button
            data-cy={`user-selection-${index}`}
            key={index}
            onClick={() => props.onSubmit?.(props.data, selection)}
          >
            {selection.value}
          </Button>
        ))
      )}
    </div>
  );
};
