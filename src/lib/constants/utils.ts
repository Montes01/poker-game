import { cardTypes, Card } from "./declarations"

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

export function generateCards(type: keyof typeof cardTypes) {
  const cards: Card[] = []
  if (type === "fibonacci") {
    cards.push({ content: "0", voted: false })
    cards.push({ content: "1", voted: false })
    cards.push({ content: "2", voted: false })
    for (let i = 2; i < 10; i++) {
      cards.push({
        content: `${Number(cards[i].content) + Number(cards[i - 1].content)}`,
        voted: false,
      })
    }
  } else if (type === "normal") {
    for (let i = 0; i < 10; i++) {
      cards.push({ content: `${i}`, voted: false })
    }
  } else if (type === "tenX") {
    for (let i = 0; i < 10; i++) {
      cards.push({ content: `${i * 10}`, voted: false })
    }
  }
  cards.push({ content: "☕", voted: false })
  cards.push({ content: "?", voted: false })
  return cards
}