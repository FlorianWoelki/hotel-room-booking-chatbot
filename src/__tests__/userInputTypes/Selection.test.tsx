import { render } from '@testing-library/react';
import { Selection } from '../../components/userInputTypes/Selection';

it('should render without crashing', () => {
  render(
    <Selection
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
