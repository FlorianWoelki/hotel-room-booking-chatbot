import { classNames } from '../util/classNames';

interface Props {
  children: React.ReactNode;
  position?: 'left' | 'right';
}

export const ChatMessage: React.FC<Props> = ({
  position = 'left',
  ...props
}): JSX.Element => {
  return (
    <div className={classNames('flex', position === 'right' && 'justify-end')}>
      <div
        className={classNames(
          'rounded px-4 py-2 inline-block',
          position === 'left'
            ? 'bg-gray-100 text-gray-500'
            : 'bg-blue-500 text-white',
        )}
      >
        <span>{props.children}</span>
      </div>
    </div>
  );
};
