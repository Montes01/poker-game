import roomActions from "../../lib/hooks/room/roomActions"
import Foot from "../../system-design/organisms/Footer"
import { useEffect, useState } from "react"
import { store } from "../../lib/store/store"
import { Card } from "../../lib/constants/declarations"
import playerActions from "../../lib/hooks/player/playerActions"
export default function Footer() {
  const [cards, setCards] = useState<Card[]>(store.getState().room.cards)
  const { player } = store.getState()
  const [isRevealed, setIsRevealed] = useState(false)
  const [revealedCards, setRevealedCards] = useState<Card[]>([])
  const { useVote } = roomActions()
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setCards(state.room.cards)
      setIsRevealed(state.room.isRevealed)
    })
    return () => unsuscribe()
  }, [])

  useEffect(() => {
    if (isRevealed) {
      const revealedCards = cards.filter((card) => card.count !== undefined)
      setRevealedCards(revealedCards)
    }
  }, [isRevealed])
  const handleVoteClick = (card: string) => {
    useVote(card)
  }

  return (
    <footer
      className={`game-cards ${
        player.type === "spectator" && "spectator-footer"
      }`}
    >
      {!isRevealed ? (
        <Foot cards={cards} vote={handleVoteClick} />
      ) : (
        <section className="average">
          <Foot revealed cards={revealedCards} vote={() => {}} />
          <article className="average-text">
            <strong>Promedio:</strong>
            <h2>{0}</h2>
          </article>
        </section>
      )}
    </footer>
  )
}
