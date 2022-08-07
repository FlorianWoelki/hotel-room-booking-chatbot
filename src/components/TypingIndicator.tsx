import { classNames } from '../util/classNames';

interface TypingDotProps {
  className?: string;
}

const TypingDot: React.FC<TypingDotProps> = (props): JSX.Element => {
  return (
    <span
      className={classNames(
        'w-2 h-2 rounded-full inline-block bg-gray-500 animate-typing-indicator',
        props.className,
      )}
    ></span>
  );
};

export const TypingIndicator: React.FC = (): JSX.Element => {
  return (
    <div className="bg-gray-100 px-4 py-2 inline-block rounded space-x-1">
      <TypingDot />
      <TypingDot className="animation-delay-150" />
      <TypingDot className="animation-delay-250" />
    </div>
  );
};
