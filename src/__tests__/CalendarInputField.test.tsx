import { render } from '@testing-library/react';
import { CalendarInputField } from '../components/CalendarInputField';
import { click } from '../test-utils/interactions';

const formatDate = (date: Date) => {
  return date.toLocaleString('de-DE', { dateStyle: 'medium' });
};

it('should run without crashing', () => {
  render(<CalendarInputField />);
});

it('should display calendar when click on input field', () => {
  expect.assertions(1);
  const { container } = render(<CalendarInputField />);

  click(container.firstChild?.firstChild!);
  expect(container.querySelector('button')).toBeDefined();
});

it('should hide calendar when clicking outside of calendar', () => {
  expect.assertions(2);
  const { container } = render(<CalendarInputField />);

  // Make calendar visible.
  click(container.firstChild?.firstChild!);
  expect(container.querySelector('button')).not.toBeNull();

  // Click on the outside of the calendar.
  click(container.querySelector('button'));
  expect(container.querySelector('button')).toBeNull();
});

it('should hide calendar when clicking outside of calendar', () => {
  const { container } = render(<CalendarInputField />);

  // Make calendar visible.
  click(container.firstChild?.firstChild!);
  expect(container.querySelector('button')).not.toBeNull();

  // Get all the available dates in the calendar.
  const availableDates = container
    .querySelector('[role=listbox]')
    ?.querySelectorAll('[aria-disabled=false]');
  expect(availableDates).not.toBeNull();
  expect(availableDates?.length).toBeGreaterThan(2);

  // Select the start and end dates in the calendar.
  const startDate = availableDates![0];
  const endDate = availableDates![1];

  expect(startDate).not.toBeNull();
  expect(endDate).not.toBeNull();

  click(startDate);
  click(endDate);

  // Get the element that describes the range of the selected dates.
  const p = container.querySelector('p');
  expect(p?.textContent).not.toBeNull();

  // Check if the element has the correct date format.
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 1);
  expect(p?.textContent).toBe(`${formatDate(start)} - ${formatDate(end)}`);
});
