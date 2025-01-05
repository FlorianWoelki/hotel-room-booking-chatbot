import { useState } from "react";
import DatePicker from "react-datepicker";

interface Props {
  /**
   * The initial start date of the date picker.
   */
  startDate?: Date;
  /**
   * The initial end date of the date picker.
   */
  endDate?: Date;
  /**
   * When the user clicks outside of the date picker, this event will be fired.
   */
  onClickOutside?: () => void;
  /**
   * When the dates change this event will be fired.
   *
   * @param startDate The changed start date.
   * @param endDate The changed end date.
   */
  onChange?: (startDate: Date, endDate: Date) => void;
}

/**
 * This component renders a chat date picker which is a simple date picker with
 * the ability to click outside of the button. When clicking outside of the
 * button an event will be fired. The internal component @see DatePicker will
 * be used to render the date picker.
 *
 * @param props The props of the chat date picker.
 * @returns The rendered chat date picker.
 */
export const ChatDatePicker: React.FC<Props> = (props: Props): JSX.Element => {
  const [startDate, setStartDate] = useState<Date>(
    props.startDate ?? new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(props.endDate ?? new Date());

  return (
    <>
      <button
        data-cy="chat-date-picker-outside-button"
        type="button"
        className="fixed inset-0 cursor-default outline-none w-full h-full"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          props.onClickOutside?.();
        }}
      ></button>
      <DatePicker
        inline
        selected={startDate}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start!);
          setEndDate(end!);
          props.onChange?.(start!, end!);
        }}
      />
    </>
  );
};
