import {
  email,
  getValidationByStr,
  mobilePhoneNumber,
  number,
  text,
} from '../../util/inputFieldValidation';

it('should accept `mobilePhoneNumber` validation', async () => {
  expect.assertions(1);
  const validation = mobilePhoneNumber();
  const result = await validation.validate('+491515151515');
  expect(result).toBe('+491515151515');
});

it('should deny `mobilePhoneNumber` validation', async () => {
  expect.assertions(1);
  const validation = mobilePhoneNumber();
  await validation
    .validate('test')
    .catch((e) => expect(e.errors.length).not.toBe(0));
});

it('should accept `number` validation', async () => {
  expect.assertions(1);
  const validation = number();
  const result = await validation.validate(11);
  expect(result).toBe(11);
});

it('should deny `number` validation', async () => {
  expect.assertions(1);
  const validation = number();
  await validation
    .validate('test')
    .catch((e) => expect(e.errors.length).not.toBe(0));
});

it('should accept `email` validation', async () => {
  expect.assertions(1);
  const validation = email();
  const result = await validation.validate('test@test.com');
  expect(result).toBe('test@test.com');
});

it('should deny `email` validation', async () => {
  expect.assertions(1);
  const validation = email();
  await validation
    .validate('test')
    .catch((e) => expect(e.errors.length).not.toBe(0));
});

it('should accept `text` validation', async () => {
  expect.assertions(1);
  const validation = text();
  const result = await validation.validate('test');
  expect(result).toBe('test');
});

it('should deny `text` validation', async () => {
  expect.assertions(1);
  const validation = text();
  await validation
    .validate('')
    .catch((e) => expect(e.errors.length).not.toBe(0));
});

const keys = ['email', 'number', 'mobilePhoneNumber', 'text', undefined];
describe('getValidationByStr', () => {
  keys.forEach((key) => {
    it(`should return \`${key}\` validation function when ${key} is \`email\``, async () => {
      expect.assertions(1);
      const validation = getValidationByStr(key);
      if (key === undefined) {
        expect(validation).not.toBeDefined();
      } else {
        expect(validation).toBeDefined();
      }
    });
  });
});
