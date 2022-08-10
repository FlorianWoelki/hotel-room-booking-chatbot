import * as yup from 'yup';

const mobilePhoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const number = () => {
  return yup.number().required();
};

export const mobilePhoneNumber = () => {
  return yup
    .string()
    .matches(mobilePhoneRegExp, 'Please enter a valid mobile phone number');
};

export const getValidationByStr = (
  key: string | undefined,
): yup.AnySchema | undefined => {
  switch (key) {
    case 'number':
      return number();
    case 'mobilePhoneNumber':
      return mobilePhoneNumber();
    default:
      return undefined;
  }
};
