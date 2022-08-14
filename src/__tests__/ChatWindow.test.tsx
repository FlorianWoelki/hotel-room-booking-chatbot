import { render } from '@testing-library/react';
import { ChatWindow } from '../components/ChatWindow';

it('should run without crashing', () => {
  render(<ChatWindow>Test</ChatWindow>);
});

it('should render children', () => {
  const { container } = render(
    <ChatWindow>
      <div>test</div>
    </ChatWindow>,
  );
  expect(container.firstChild?.firstChild).toMatchInlineSnapshot(`
      <div>
        test
      </div>
    `);
});
