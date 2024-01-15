import { Card } from "./declarations"

export const COMPANY_NAME = "pragma"

export const serverPath = "http://localhost:3000"

export const cards: Card[] = generateCards("normal")

export function generateCards(type: "fibonacci" | "normal" | "tenX") {
  const cards: Card[] = []
  if (type === "fibonacci") {
    for (let i = 0; i < 13; i++) {
      cards.push({ content: `${i}`, voted: false })
    }

    cards.push({ content: "☕", voted: false })
    cards.push({ content: "?", voted: false })
  } else if (type === "normal") {
    for (let i = 0; i < 10; i++) {
      cards.push({ content: `${i}`, voted: false })
    }
    cards.push({ content: "☕", voted: false })
    cards.push({ content: "?", voted: false })
  } else if (type === "tenX") {
    for (let i = 0; i < 10; i++) {
      cards.push({ content: `${i * 10}`, voted: false })
    }
    cards.push({ content: "☕", voted: false })
    cards.push({ content: "?", voted: false })
  }
  return cards
}
