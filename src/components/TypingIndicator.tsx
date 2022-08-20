import { classNames } from '../util/classNames';

interface TypingDotProps {
  /**
   * The classes that will be applied to the typing dot.
   */
  className?: string;
}

/**
 * Renders a single typing dot.
 *
 * @param {TypingDotProps} props The props that will be passed to the component.
 * @returns {JSX.Element} The rendered typing dot.
 */
const TypingDot: React.FC<TypingDotProps> = (
  props: TypingDotProps,
): JSX.Element => {
  return (
    <span
      className={classNames(
        'w-2 h-2 rounded-full inline-block bg-gray-500 animate-typing-indicator',
        props.className,
      )}
    ></span>
  );
};

/**
 * Renders a typing indicator that visualizes when someone is typing. This
 * component will make use of the @see TypingDot to animate and render three
 * different typing dots.
 *
 * @returns {JSX.Element} The rendered typing indicator with three typing dots.
 */
export const TypingIndicator: React.FC = (): JSX.Element => {
  return (
    <div className="bg-gray-100 px-4 py-2 inline-block rounded space-x-1">
      <TypingDot />
      <TypingDot className="animation-delay-150" />
      <TypingDot className="animation-delay-250" />
    </div>
  );
};
