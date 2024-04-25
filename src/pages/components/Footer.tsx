import Foot from "../../system-design/organisms/Footer"
import { useEffect, useState } from "react"
import { store } from "../../lib/store/store"
import { connection } from "../../lib/constants/constants"
import { ioEvents } from "../../lib/constants/declarations"
import playerActions from "../../lib/hooks/player/playerActions"
export default function Footer() {
  const [player, setPlayer] = useState(store.getState().player)
  const [isRevealed, setIsRevealed] = useState(false)
  const [average, setAverage] = useState(0)
  const { UseSetVote } = playerActions()
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setIsRevealed(state.room.isRevealed)
      setPlayer(state.player)
    })
    return () => unsuscribe()
  }, [])
  useEffect(() => {
    if (isRevealed) {
      const average = store.getState().room.cards.reduce((acc, card) => {
        if (card.count && !isNaN(Number(card.content))) {
          return acc + card.count * Number(card.content)
        }
        return acc
      }, 0)
      setAverage(average / store.getState().room.cards.filter(card => card.count).length)
    }
  }, [isRevealed])

  const handleVoteClick = (card: string) => {
    const playerId = player.id
    connection.emit(
      ioEvents.vote,
      { roomId: store.getState().room.id, playerId, cardContent: card },
      (cardContent: string) => {
        UseSetVote(cardContent)
      }
    )
  }

  return (
    <footer
      className={`game-cards`}
    >
      {!isRevealed ? (
        <>
          {player.type === "player" && (<Foot vote={handleVoteClick} />)}
        </>
      ) : (
        <section className="average">
          {player.type === "player" && (<Foot revealed vote={() => { }} />)}
          <article className="average-text">
            <strong>Promedio:</strong>
            <h2>{average}</h2>
          </article>
        </section>
      )}
    </footer>
  )
}
