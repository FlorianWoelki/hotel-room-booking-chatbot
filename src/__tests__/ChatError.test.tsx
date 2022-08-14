import { render } from '@testing-library/react';
import { ChatError } from '../components/ChatError';

it('should run without crashing', () => {
  render(<ChatError />);
});
