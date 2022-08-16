import { render } from '@testing-library/react';
import { Link } from '../../components/userInputTypes/Link';
import { click } from '../../test-utils/interactions';

it('should render without crashing', () => {
  render(
    <Link
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'link',
          href: 'http://test.de',
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );
});

it('should render `Please wait` instead of link', () => {
  expect.assertions(1);
  const { container } = render(
    <Link
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'selection',
          href: 'http://test.de',
        },
      }}
      isWaitingForInput={false}
      onSubmit={() => {}}
    />,
  );

  expect(container.firstChild?.firstChild?.textContent).toBe('Please wait');
});

it('should trigger `onClick` when clicking on button', () => {
  expect.assertions(1);
  const onSubmit = jest.fn();
  const { container } = render(
    <Link
      data={{
        id: 'testId',
        messages: [],
        userInput: {
          type: 'selection',
          href: 'http://test.de',
        },
      }}
      isWaitingForInput={true}
      onSubmit={onSubmit}
    />,
  );

  click(container.querySelector('a')?.firstChild!);
  expect(onSubmit).toBeCalledTimes(1);
});
