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

export default function Room() {
  const navigator = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [roomName, setRoomName] = useState("")
  const [players, setPlayers] = useState<player[]>([])
  const [playerName, setPlayerName] = useState("NA")
  const [cards, setCards] = useState(Cards)
  const [isComplete, setIsComplete] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { useAddPlayer, useVote } = roomActions()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    const player = useAddPlayer(username, userType)
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
    console.log(players.every((player) => player.vote !== "none"))
  }, [players])

  useEffect(() => {
    const state = store.getState()
    if (state.room.id === "") navigator("/home")
    if (!localStorage.getItem("playerId")) {
      dialogRef.current?.showModal()
    } else {
      const playerId = localStorage.getItem("playerId")!
      const player = state.room.players.find((player) => player.id === playerId)
      setPlayerName(player?.name || "404")
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
          {isAdmin && (
            <Button disabled={!isComplete} content="Revelar cartas" />
          )}
        </Table>
        {players.map((player, index) => (
          <Card
            vote={player.vote}
            onTable
            content={player.name}
            key={player.id}
            className={`user${index}`}
          />
        ))}
      </main>
      <footer className="game-cards">
        {cards.map((card) => (
          <Card
            vote={card.voted ? "1" : "none"}
            onClick={() => handleVoteClick(card.content)}
            content={card.content}
            key={card.content}
          />
        ))}
      </footer>
      <PlayerNameDialog dialogRef={dialogRef} handleSubmit={handleSubmit} />
    </section>
  )
}
