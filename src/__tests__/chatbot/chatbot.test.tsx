import FreeTextChatbot from '../../chatbot';

const chatbot = new FreeTextChatbot(
  [
    {
      botResponse: ['Hello!', 'Hi!'],
      listOfWords: ['hi'],
      singleResponse: true,
      requiredWords: [],
    },
  ],
  ['I am not sure, what that means'],
);

it('should respond with a positive found answer', () => {
  const response = chatbot.getResponse('hi');
  expect(response).toMatch(/Hello!|Hi!|/);
});

it('should respond with a negative not found answer', () => {
  const response = chatbot.getResponse('test');
  expect(response).toMatch(/I am not sure, what that means/);
});

it('should add a new chatbot answer', () => {
  chatbot.addAnswer({
    botResponse: ['Bot test answer'],
    listOfWords: ['test'],
    singleResponse: true,
    requiredWords: [],
  });
  const response = chatbot.getResponse('test');
  expect(response).toMatch(/Bot test answer/);
});
