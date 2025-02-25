import * as yup from "yup";
import { RequiredNumberSchema } from "yup/lib/number";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

const mobilePhoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

/**
 * Defines and returns a required yup number validation schema.
 *
 * @returns The returned yup validation schema.
 */
export const number = (): RequiredNumberSchema<
  number | undefined,
  AnyObject
> => {
  return yup.number().required().typeError("Please specify only a number.");
};

/**
 * Defines and returns a required yup mobile phone number validation schema.
 *
 * @returns The returned yup validation schema.
 */
export const mobilePhoneNumber = (): RequiredStringSchema<
  string | undefined,
  AnyObject
> => {
  return yup
    .string()
    .matches(mobilePhoneRegExp, "Please enter a valid mobile phone number.")
    .required();
};

/**
 * Defines and returns a required yup email validation schema.
 *
 * @returns The returned yup validation schema.
 */
export const email = (): RequiredStringSchema<
  string | undefined,
  AnyObject
> => {
  return yup.string().email("Please enter a valid email address.").required();
};

/**
 * Defines and returns a required string yup validation schema.
 *
 * @returns The returned yup validation schema.
 */
export const text = (): RequiredStringSchema<string | undefined, AnyObject> => {
  return yup.string().required();
};

/**
 * Gets a predefined yup validation schema of a specific key.
 *
 * @param key The key to get the validation schema.
 * @returns The validation schema.
 */
export const getValidationByStr = (
  key: string | undefined,
): yup.AnySchema | undefined => {
  switch (key) {
    case "text":
      return text();
    case "email":
      return email();
    case "number":
      return number();
    case "mobilePhoneNumber":
      return mobilePhoneNumber();
    default:
      return undefined;
  }
};
