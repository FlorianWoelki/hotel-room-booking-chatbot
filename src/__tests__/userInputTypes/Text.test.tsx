import { render } from '@testing-library/react';
import { Text } from '../../components/userInputTypes/Text';
import { click, keyDown } from '../../test-utils/interactions';

it('should render without crashing', () => {
  render(
    <Text
      inputFieldPlaceholder="Test placeholder"
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'text',
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );
});

it('should trigger `onSubmit` when pressing enter', () => {
  expect.assertions(2);
  const ref = {
    current: {
      value: 'Test',
    },
  };
  const onSubmit = jest.fn();
  const { container } = render(
    <Text
      ref={ref as any}
      inputFieldPlaceholder="Test placeholder"
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'text',
        },
      }}
      isWaitingForInput={false}
      onSubmit={onSubmit}
    />,
  );

  keyDown(container.querySelector('input'), { key: 'Enter' });
  expect(onSubmit).toBeCalledTimes(1);
  expect(ref.current.value).toBe('');
});

it('should trigger `onSubmit` when clicking the send button', () => {
  expect.assertions(2);
  const ref = {
    current: {
      value: 'Test',
    },
  };
  const onSubmit = jest.fn();
  const { container } = render(
    <Text
      ref={ref as any}
      inputFieldPlaceholder="Test placeholder"
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'text',
        },
      }}
      isWaitingForInput={true}
      onSubmit={onSubmit}
    />,
  );

  click(container.querySelector('button'));
  expect(onSubmit).toBeCalledTimes(1);
  expect(ref.current.value).toBe('');
});
