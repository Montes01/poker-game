import { Card, cardTypes } from "./declarations"

export const COMPANY_NAME = "pragma"

export const serverPath = "http://localhost:3000"

export const cards: Card[] = generateCards("tenX")

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
