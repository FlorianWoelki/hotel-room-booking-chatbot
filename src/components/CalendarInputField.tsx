import { useEffect, useState } from 'react';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { classNames } from '../util/classNames';
import { ChatDatePicker } from './ChatDatePicker';

interface ChildrenCallback {
  value: string;
  setDisplayValue: (value: string) => void;
  isValid: boolean;
}

interface Props {
  value?: string;
  disabled?: boolean;
  children?: (childrenCallback: ChildrenCallback) => React.ReactNode;
}

export const CalendarInputField: React.FC<Props> = (props): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string>(props.value ?? '');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!props.value) {
      setDisplayValue('');
      return;
    }

    setDisplayValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    setDisplayValue(`${formatDate(startDate)} - ${formatDate(endDate)}`);
  }, [startDate, endDate]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', { dateStyle: 'medium' });
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          'flex items-center relative py-4 pl-6 pr-12 shadow rounded-full border border-gray-100 cursor-pointer',
          props.disabled && 'cursor-not-allowed bg-gray-100',
        )}
        onClick={() => setIsCalendarOpen((prev) => !prev)}
      >
        <CalendarIcon className="w-5 h-5 text-gray-600 mr-2" />
        {displayValue && <p className="text-gray-600">{displayValue}</p>}
        {props.children?.({
          value: displayValue,
          isValid: displayValue.includes('-'),
          setDisplayValue,
        })}
      </div>
      {isCalendarOpen && (
        <div className="absolute left-0 right-0 bottom-0 flex items-center justify-center mb-16">
          <ChatDatePicker
            startDate={startDate}
            endDate={endDate}
            onClickOutside={() => setIsCalendarOpen(false)}
            onChange={(startDate, endDate) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
          />
        </div>
      )}
    </div>
  );
};
