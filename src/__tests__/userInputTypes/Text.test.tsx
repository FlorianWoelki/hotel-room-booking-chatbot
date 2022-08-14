import { render } from '@testing-library/react';
import { Text } from '../../components/userInputTypes/Text';

it('should render without crashing', () => {
  render(
    <Text
      inputFieldPlaceholder="Test placeholder"
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
