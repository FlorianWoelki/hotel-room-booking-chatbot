import React, { useEffect, useState } from 'react';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { classNames } from '../util/classNames';
import { ChatDatePicker } from './ChatDatePicker';

interface ChildrenCallback {
  /**
   * The actual display value that will be displayed in the input field.
   */
  value: string;
  /**
   * Sets the display value for the input field.
   *
   * @param {string} value The value for setting the display value.
   * @returns {void}
   */
  setDisplayValue: (value: string) => void;
  /**
   * If the input field and dates are valid.
   */
  isValid: boolean;
}

interface Props {
  /**
   * The initial value of the input field.
   */
  value?: string;
  /**
   * If the input field will be disabled.
   */
  disabled?: boolean;
  /**
   * Defines the children of the input field.
   *
   * @param {ChildrenCallback} childrenCallback The callback when the input field gets rendered
   * @returns {React.ReactNode} The children nodes.
   */
  children?: (childrenCallback: ChildrenCallback) => React.ReactNode;
}

/**
 * Renders a calendar input field with the ability to select a specific date
 * range in an interactive calendar. This component also formats the selected
 * dates and displays it in the input field.
 *
 * @param {Props} props The props of the calendar input field.
 * @returns {JSX.Element} The rendered calendar input field.
 */
export const CalendarInputField: React.FC<Props> = (
  props: Props,
): JSX.Element => {
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

  /**
   * Returns the date in a specific format. The format will be `de-DE` and
   * the date style will be medium. Which means that the date will become
   * something like this: `01.01.2022`.
   *
   * @param {Date} date The date that will be formatted.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', { dateStyle: 'medium' });
  };

  return (
    <div className="relative">
      <div
        data-cy="calendar-input-field"
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
