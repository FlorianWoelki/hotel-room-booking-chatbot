import { useState } from 'react';
import DatePicker from 'react-datepicker';

interface Props {
  startDate?: Date;
  endDate?: Date;
  onClickOutside?: () => void;
  onChange?: (startDate: Date, endDate: Date) => void;
}

export const ChatDatePicker: React.FC<Props> = (props): JSX.Element => {
  const [startDate, setStartDate] = useState<Date>(
    props.startDate ?? new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(props.endDate ?? new Date());

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 cursor-default outline-none"
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
