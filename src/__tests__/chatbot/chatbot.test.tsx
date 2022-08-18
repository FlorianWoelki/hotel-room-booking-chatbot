import FreeTextChatbot from '../../chatbot';

const answers = [
  {
    botResponse: ['Hello!', 'Hi!'],
    listOfWords: ['hi'],
    singleResponse: true,
    requiredWords: [],
  },
];
const unsureAnswers = ['I am not sure, what that means'];

const createChatbot = (): FreeTextChatbot => {
  return new FreeTextChatbot(answers, unsureAnswers);
};

it('should respond with a positive found answer', () => {
  const chatbot = createChatbot();
  const response = chatbot.getResponse('hi');
  expect(response).toMatch(/Hello!|Hi!|/);
});

it('should respond with a negative not found answer', () => {
  const chatbot = createChatbot();
  const response = chatbot.getResponse('test');
  expect(response).toMatch(/I am not sure, what that means/);
});

it('should add a new chatbot answer', () => {
  const chatbot = createChatbot();
  chatbot.addAnswer({
    botResponse: ['Bot test answer'],
    listOfWords: ['test'],
    singleResponse: true,
    requiredWords: [],
  });
  const response = chatbot.getResponse('test');
  expect(response).toMatch(/Bot test answer/);
});

it('should respond with a negative not found answer when required word is not in message', () => {
  const chatbot = createChatbot();
  chatbot.addAnswer({
    botResponse: ['Bot test answer'],
    listOfWords: ['test'],
    singleResponse: false,
    requiredWords: ['testing'],
  });
  const response = chatbot.getResponse('Something test');
  expect(response).toMatch(/I am not sure, what that means/);
});

it('should respond with a positive answer when required word is in message', () => {
  const chatbot = createChatbot();
  chatbot.addAnswer({
    botResponse: ['Bot test answer'],
    listOfWords: ['test'],
    singleResponse: false,
    requiredWords: ['testing'],
  });
  const response = chatbot.getResponse('Something test testing');
  expect(response).toMatch(/Bot test answer/);
});

it('should respond with answer as string', () => {
  const chatbot = createChatbot();
  chatbot.addAnswer({
    botResponse: 'Bot test answer',
    listOfWords: ['test'],
    singleResponse: true,
    requiredWords: [],
  });
  const response = chatbot.getResponse('Something test');
  expect(response).toMatch(/Bot test answer/);
});
