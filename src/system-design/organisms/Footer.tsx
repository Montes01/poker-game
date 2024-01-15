import { Card as CardType } from "../../lib/constants/declarations"
import { store } from "../../lib/store/store"
import Card from "../atoms/Card"
import { useEffect, useState } from "react"

interface Props {
  vote: (card: string) => void
  revealed?: boolean
}
export default function Footer({ vote, revealed }: Props) {
  const [playerVote, setPlayerVote] = useState(store.getState().player.vote)
  const [cards, setCards] = useState<CardType[]>(store.getState().room.cards)
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setPlayerVote(state.player.vote)
      setCards(state.room.cards)
    })
    return () => unsuscribe()
  }, [])
  useEffect(() => {
    setCards(
      store.getState().room.cards.filter((card) => card.count !== undefined)
    )
  }, [revealed])
  return (
    <>
      {cards.map((card) => (
        <Card
          vote={!revealed && playerVote === card.content ? "1" : "none"}
          onClick={() => vote(card.content)}
          content={card.content}
          key={card.content}
          voteCount={card.count ?? undefined}
        />
      ))}
    </>
  )
}
