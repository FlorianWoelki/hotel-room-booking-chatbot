import { render, screen } from '@testing-library/react';
import { ChatDatePicker } from '../components/ChatDatePicker';
import { click } from '../test-utils/interactions';

it('should run without crashing', () => {
  render(<ChatDatePicker />);
});

it('should trigger `onClickOutside` when clicked outside the date picker', () => {
  expect.assertions(1);
  const fn = jest.fn();
  const { container } = render(<ChatDatePicker onClickOutside={fn} />);
  click(container.firstChild);
  expect(fn).toBeCalledTimes(1);
});

it('should trigger `onChange` when clicked on start date and end date', () => {
  expect.assertions(3);
  const fn = jest.fn();
  const { container } = render(<ChatDatePicker onChange={fn} />);
  const notDisabledElements = container.querySelectorAll(
    '[aria-disabled=false]',
  );
  expect(notDisabledElements.length).toBeGreaterThan(2);

  const startDate = notDisabledElements[0];
  const endDate = notDisabledElements[1];

  click(startDate);
  expect(fn).toBeCalledTimes(1);
  click(endDate);
  expect(fn).toBeCalledTimes(2);
});
