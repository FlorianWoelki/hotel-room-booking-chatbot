import { render } from '@testing-library/react';
import { CalendarInputField } from '../components/CalendarInputField';
import { click } from '../test-utils/interactions';

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
