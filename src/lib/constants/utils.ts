//must be between 5-20 characters
const LENGTH_REGEX = /^.{5,20}$/
//must contain less than 3 numbers
const NUMBER_REGEX = /^(?:\D*\d){0,3}\D*$/
//must not contain only numbers
const ONLY_NUMBER_REGEX = /[a-zA-Z]/
//must not contain special characters
const SPECIAL_CHAR_REGEX = /^[a-zA-Z0-9]*$/

//create the validator
export const validateName = (value: string) => {
  if (!LENGTH_REGEX.test(value)) {
    throw new Error('Must be between 5-20 characters')
  }
  if (!NUMBER_REGEX.test(value)) {
    throw new Error('Must contain less than 3 numbers')
  }
  if (!ONLY_NUMBER_REGEX.test(value)) {
    throw new Error('Must not contain only numbers')
  }
  if (!SPECIAL_CHAR_REGEX.test(value)) {
    throw new Error('Must not contain special characters')
  }
}