import { render } from '@testing-library/react';
import { Selection } from '../../components/userInputTypes/Selection';
import { click } from '../../test-utils/interactions';

it('should render without crashing', () => {
  render(
    <Selection
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'selection',
          selections: [
            { value: 'Test 1', followMessageId: 'a' },
            { value: 'Test 2', followMessageId: 'b' },
            { value: 'Test 3', followMessageId: 'c' },
          ],
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );
});

it('should render `Please wait` instead of selections', () => {
  expect.assertions(1);
  const { container } = render(
    <Selection
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'selection',
          selections: [
            { value: 'Test 1', followMessageId: 'a' },
            { value: 'Test 2', followMessageId: 'b' },
            { value: 'Test 3', followMessageId: 'c' },
          ],
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );

  expect(container.firstChild?.firstChild?.textContent).toBe('Please wait');
});

it('should trigger `onClick` when clicking on selection', () => {
  expect.assertions(1);
  const onSubmit = jest.fn();
  const { container } = render(
    <Selection
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'selection',
          selections: [
            { value: 'Test 1', followMessageId: 'a' },
            { value: 'Test 2', followMessageId: 'b' },
            { value: 'Test 3', followMessageId: 'c' },
          ],
        },
      }}
      isWaitingForInput={true}
      onSubmit={onSubmit}
    />,
  );

  click(container.firstChild?.firstChild!);
  expect(onSubmit).toBeCalledTimes(1);
});
