import { getResponse } from '../../chatbot';

it('should respond with a positive found answer', () => {
  const response = getResponse('hi');
  expect(response).toMatch(/Hello!|Hi, how can I help you\?|Hello there 😀/);
});

it('should respond with a negative not found answer', () => {
  const response = getResponse('test');
  expect(response).toMatch(/I am not sure, what that means 😔/);
});
