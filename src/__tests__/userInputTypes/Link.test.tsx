import { render } from '@testing-library/react';
import { Link } from '../../components/userInputTypes/Link';

it('should render without crashing', () => {
  render(
    <Link
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
