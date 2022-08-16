import { render } from '@testing-library/react';
import { Date } from '../../components/userInputTypes/Date';
import { click } from '../../test-utils/interactions';

it('should render without crashing', () => {
  render(
    <Date
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'date',
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );
});

it('should render `Please wait` instead of Date', () => {
  expect.assertions(1);
  const { container } = render(
    <Date
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'date',
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );

  expect(container.querySelector('p')?.textContent).toBe('Please wait');
});

it('should render `Please select a date range` instead of date value', () => {
  expect.assertions(1);
  const { container } = render(
    <Date
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'date',
        },
      }}
      isWaitingForInput={true}
      onSubmit={() => {}}
    />,
  );

  expect(container.querySelector('p')?.textContent).toBe(
    'Please select a date range',
  );
});

it('should trigger `onClick` when pressing on send button', () => {
  expect.assertions(2);
  const onSubmit = jest.fn();
  const { container } = render(
    <Date
      value="2022 - 2023"
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'date',
        },
      }}
      isWaitingForInput={true}
      onSubmit={onSubmit}
    />,
  );

  click(container.querySelector('button'));
  expect(container.querySelector('p')?.textContent).not.toBe('Please wait');
  expect(onSubmit).toBeCalledTimes(1);
});
