import { classNames } from '../util/classNames';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export const InputField: React.FC<Props> = (props): JSX.Element => {
  return (
    <div className={classNames('flex items-center', props.className)}>
      <input
        type="text"
        placeholder={props.placeholder}
        disabled={props.disabled}
        className="block py-4 pl-6 pr-12 w-full text-gray-900 sm:text-md shadow rounded-full border border-gray-100 focus:outline-none transition duration-150 ease-in-out focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50"
      />
      {props.children}
    </div>
  );
};
