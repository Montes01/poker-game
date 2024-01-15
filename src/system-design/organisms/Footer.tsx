import { Card as CardType } from "../../lib/constants/declarations"
import { store } from "../../lib/store/store"
import Card from "../atoms/Card"
import { useEffect, useState } from "react"

interface Props {
  cards: CardType[]
  vote: (card: string) => void
  revealed?: boolean
}
export default function Footer({ cards, vote, revealed }: Props) {
  const [playerVote, setPlayerVote] = useState(store.getState().player.vote)
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setPlayerVote(state.player.vote)
    })
    return () => unsuscribe()
  }, [])
  return (
    <>
      {cards.map((card) => (
        <Card
          vote={
            !revealed && playerVote === card.content ? card.content : "none"
          }
          onClick={() => vote(card.content)}
          content={card.content}
          key={card.content}
          voteCount={card.count ?? undefined}
        />
      ))}
    </>
  )
}
