import { render } from '@testing-library/react';
import { SendButton } from '../components/SendButton';

it('should run without crashing', () => {
  render(<SendButton />);
});
