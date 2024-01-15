import { useEffect } from "react"
import roomActions from "../../lib/hooks/room/roomActions"
import { store } from "../../lib/store/store"
import Foot from "../../system-design/organisms/Footer"
export default function Footer() {
  const { room, player } = store.getState()
  const { useVote } = roomActions()

  const handleVoteClick = (card: string) => {
    useVote(card)
  }

  return (
    <footer
      className={`game-cards ${
        player.type === "spectator" && "spectator-footer"
      }`}
    >
      {!room.isRevealed ? (
        <Foot cards={room.cards} vote={handleVoteClick} />
      ) : (
        <section className="average">
          <Foot revealed cards={room.cards} vote={() => {}} />
          <article className="average-text">
            <strong>Promedio:</strong>
            <h2>{0}</h2>
          </article>
        </section>
      )}
    </footer>
  )
}
