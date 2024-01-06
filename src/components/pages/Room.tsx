import "../../assets/components/room.scss"
import "../../assets/components/user-form.scss"
import HeadLogo from "../molecules/HeadLogo"
import UserAvatar from "../atoms/UserAvatar"
import Button from "../atoms/Button"
import Table from "../atoms/Table"
import { useEffect, useRef, useState } from "react"
import { store } from "../../lib/store/store"
import PlayerNameDialog from "../templates/PlayerNameDialog"
import roomActions from "../../lib/hooks/room/roomActions"
import { playerType, player } from "../../lib/constants/declarations"
import Card from "../atoms/Card"
import { useNavigate } from "react-router-dom"
import { cards as Cards } from "../../lib/constants/constants"
import Footer from "../organisms/Footer"
import { Card as cardT } from "../../lib/constants/declarations"
export default function Room() {
  const navigator = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [roomName, setRoomName] = useState("")
  const [players, setPlayers] = useState<player[]>([])
  const [playerName, setPlayerName] = useState("NA")
  const [cards, setCards] = useState(Cards)
  const [isComplete, setIsComplete] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSpectator, setIsSpectator] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [average, setAverage] = useState(0)
  const { useAddPlayer, useReset, useVote, useRevealCards, useVotePerCard } =
    roomActions()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    const player = useAddPlayer(username, userType)
    if (userType === "spectator") setIsSpectator(true)
    localStorage.setItem("playerId", player.id)
    setPlayerName(player.name)
    dialogRef.current?.close()
  }
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setRoomName(state.room.name)
      setPlayers(state.room.players)
    })
    return () => unsuscribe()
  }, [])
  useEffect(() => {
    const playerId = localStorage.getItem("playerId")!
    if (store.getState().room.admin === playerId) setIsAdmin(true)
    if (players.every((player) => player.vote !== "none")) setIsComplete(true)
    else setIsComplete(false)
  }, [players])

  useEffect(() => {
    const state = store.getState()
    if (state.room.id === "") navigator("/home")
    if (!localStorage.getItem("playerId")) {
      dialogRef.current?.showModal()
    } else {
      const playerId = localStorage.getItem("playerId")!
      const player = state.room.players.find((player) => player.id === playerId)
      setPlayerName(player?.name ?? "404")
    }

    setRoomName(state.room.name)
  }, [])

  const handleVoteClick = (card: string) => {
    setCards((prev) => {
      return prev.map((prevCard) => {
        if (prevCard.content === card) prevCard.voted = true
        else prevCard.voted = false
        return prevCard
      })
    })
    useVote(card, localStorage.getItem("playerId")!)
  }

  const handleRevealClick = () => {
    setAverage(useRevealCards())
    setIsRevealed(true)
    setCards(useVotePerCard() as cardT[])
  }
  const handleResetClick = () => {
    useReset()
    setIsRevealed(false)
    setCards(Cards.map((card) => ({ ...card, voted: false })))
  }

  return (
    <section className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1>{roomName}</h1>
        <section className="room-options">
          <UserAvatar name={playerName} />
          <Button className="invite-button" content="invitar jugadores" />
        </section>
      </header>
      <main className="game-body">
        <Table>
          <>
            {isAdmin && (
              <Button
                onClick={isRevealed ? handleResetClick : handleRevealClick}
                disabled={!isComplete}
                content={isRevealed ? "Nueva partida" : "Revelar cartas"}
              />
            )}
          </>
        </Table>

        {players.map((player, index) => (
          <>
            {player.type === "spectator" ? (
              <UserAvatar
                key={player.id}
                onTable
                name={player.name}
                className={`user${index}`}
              />
            ) : (
              <Card
                vote={player.vote}
                onTable
                content={player.name}
                key={player.id}
                className={`user${index}`}
              />
            )}
          </>
        ))}
      </main>
      <footer className={`game-cards ${isSpectator && "spectator-footer"}`}>
        {!isRevealed ? (
          <Footer cards={cards} vote={handleVoteClick} />
        ) : (
          <section className="average">
            <Footer revealed cards={cards} vote={() => {}} />
            <article className="average-text">
              <strong>Promedio:</strong>
              <h2>{average}</h2>
            </article>
          </section>
        )}
      </footer>
      <PlayerNameDialog dialogRef={dialogRef} handleSubmit={handleSubmit} />
    </section>
  )
}
