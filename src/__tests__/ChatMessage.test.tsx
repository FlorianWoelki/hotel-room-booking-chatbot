import { render } from '@testing-library/react';
import { ChatMessage } from '../components/ChatMessage';

it('should run without crashing', () => {
  render(<ChatMessage>Test</ChatMessage>);
});
