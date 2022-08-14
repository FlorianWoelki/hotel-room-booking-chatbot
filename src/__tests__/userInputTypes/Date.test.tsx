import { render } from '@testing-library/react';
import { Date } from '../../components/userInputTypes/Date';

it('should render without crashing', () => {
  render(
    <Date
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
