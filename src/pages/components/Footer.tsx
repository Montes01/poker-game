import { useEffect, useState } from "react"
import roomActions from "../../lib/hooks/room/roomActions"
import { store } from "../../lib/store/store"
import Foot from "../../system-design/organisms/Footer"
import { Card } from "../../lib/constants/declarations"
export default function Footer() {
  const { room, player } = store.getState()
  const [isRevealed, setIsRevealed] = useState(false)
  const [revealedCards, setRevealedCards] = useState<Card[]>([])
  const { useVote } = roomActions()
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setIsRevealed(state.room.isRevealed)
    })
    return () => unsuscribe()
  }, [])

  useEffect(() => {
    if (isRevealed) {
      const revealedCards = room.cards.filter((card) => card.count !== undefined)
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
        <Foot cards={room.cards} vote={handleVoteClick} />
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
