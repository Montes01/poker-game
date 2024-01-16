import roomActions from "../../lib/hooks/room/roomActions"
import Foot from "../../system-design/organisms/Footer"
import { useEffect, useState } from "react"
import { store } from "../../lib/store/store"
export default function Footer() {
  const { player } = store.getState()
  const [isRevealed, setIsRevealed] = useState(false)
  const [average, setAverage] = useState(0)
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
      console.log("is here")
      setAverage(
        store
          .getState()
          .room.players.reduce((acc, player) => acc + Number(player.vote), 0) /
          store.getState().room.players.length
      )
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
        <Foot vote={handleVoteClick} />
      ) : (
        <section className="average">
          <Foot revealed vote={() => {}} />
          <article className="average-text">
            <strong>Promedio:</strong>
            <h2>{average}</h2>
          </article>
        </section>
      )}
    </footer>
  )
}
