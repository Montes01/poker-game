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
    throw new Error("Debe tener entre 5 y 20 caracteres")
  }
  if (!ONLY_NUMBER_REGEX.test(value)) {
    throw new Error("No debe contener solo números")
  }
  if (!NUMBER_REGEX.test(value)) {
    throw new Error("Debe contener menos de 3 números")
  }
  if (!SPECIAL_CHAR_REGEX.test(value)) {
    throw new Error("No debe contener caracteres especiales")
  }
}

export const getFirstUserLetters = (name: string) => {
  if (name.length < 3) return name
  const words = name.split(" ")
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase()
  else return (words[0][0] + words[0][1]).toUpperCase()
}

export function generateLink(id:string) {
  let link = ""
  if (typeof window !== "undefined") {
    link = `${window.location.origin}/room/${id}`
  } else {
    link = `http://localhost/room/${id}`
  }
  return link
}

export function generateCards(type: keyof typeof cardTypes) {
  const cards: Card[] = []
  if (type === "fibonacci") {
    cards.push({ content: "0", voted: false })
    cards.push({ content: "1", voted: false })
    cards.push({ content: "2", voted: false })
    for (let i = 2; i < 9; i++) {
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