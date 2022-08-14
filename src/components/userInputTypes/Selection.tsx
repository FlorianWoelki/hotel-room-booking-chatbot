import { UserInputTypeProps } from '../../@types/UserInputType';
import { classNames } from '../../util/classNames';
import { Button } from '../Button';

export const Selection: React.FC<UserInputTypeProps> = (props): JSX.Element => {
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
