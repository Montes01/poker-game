import { store } from "../store/store"

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
    throw new Error("Must be between 5-20 characters")
  }
  if (!NUMBER_REGEX.test(value)) {
    throw new Error("Must contain less than 3 numbers")
  }
  if (!ONLY_NUMBER_REGEX.test(value)) {
    throw new Error("Must not contain only numbers")
  }
  if (!SPECIAL_CHAR_REGEX.test(value)) {
    throw new Error("Must not contain special characters")
  }
}

export const getFirstUserLetters = (name: string) => {
  if (name.length < 3) return name
  const words = name.split(" ")
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase()
  else return (words[0][0] + words[0][1]).toUpperCase()
}

export function generateLink(id:string) {
  let link = window.location.origin + "/room/" + id
  return link
}
