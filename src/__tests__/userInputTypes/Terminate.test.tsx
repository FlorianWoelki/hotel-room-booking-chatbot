import { render } from '@testing-library/react';
import { Terminate } from '../../components/userInputTypes/Terminate';

it('should render without crashing', () => {
  render(<Terminate />);
});
