import { render } from '@testing-library/react';
import { ChatMessage } from '../components/ChatMessage';

it('should run without crashing', () => {
  render(<ChatMessage>Test</ChatMessage>);
});

it('should have correct left classes because position is `left`', () => {
  const { container } = render(<ChatMessage position="left">Test</ChatMessage>);
  expect((container.firstChild! as HTMLElement).className).not.toContain(
    'justify-end',
  );
  expect((container.firstChild!.firstChild as HTMLElement).className).toContain(
    'bg-gray-100 text-gray-500',
  );
});

it('should have correct right classes because position is `right`', () => {
  const { container } = render(
    <ChatMessage position="right">Test</ChatMessage>,
  );
  expect((container.firstChild! as HTMLElement).className).toContain(
    'justify-end',
  );
  expect((container.firstChild!.firstChild as HTMLElement).className).toContain(
    'bg-blue-500 text-white',
  );
});
