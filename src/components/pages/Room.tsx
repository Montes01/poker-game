import "../../assets/components/room.scss"
import "../../assets/components/user-form.scss"
import HeadLogo from "../molecules/HeadLogo"
import UserAvatar from "../atoms/UserAvatar"
import Button from "../atoms/Button"
import Table from "../atoms/Table"
import { useEffect, useRef, useState } from "react"
import { store } from "../../lib/store/store"
import FormDialog from "../templates/FormDialog"
import roomActions from "../../lib/hooks/room/roomActions"
import { ioEvents, player, room } from "../../lib/constants/declarations"
import Card from "../atoms/Card"
import { useNavigate, useParams } from "react-router-dom"
import { cards as Cards } from "../../lib/constants/constants"
import Footer from "../organisms/Footer"
import { Card as cardT } from "../../lib/constants/declarations"
import Input from "../atoms/Input"
import RoomInitialDialog from "../organisms/RoomInitialDialog"
import { generateLink } from "../../lib/constants/utils"
import { connection } from "../../App"

export default function Room() {
  const navigator = useNavigate()
  const params = useParams()
  const { player } = store.getState()
  const [initial, setInitial] = useState(true)
  const [roomName, setRoomName] = useState("")
  const [players, setPlayers] = useState<player[]>([])
  const [cards, setCards] = useState(Cards)
  const [isComplete, setIsComplete] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [average, setAverage] = useState(0)
  const inviteRef = useRef<HTMLDialogElement>(null)
  const { useReset, useVote, useRevealCards, useVotePerCard, useUpdateRoom } =
    roomActions()

  useEffect(() => {
    connection.on(ioEvents.updateRoom, (room: room) => {
      console.log("updated", room)
      useUpdateRoom(room)
    })
  }, [])

  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setRoomName(state.room.name)
      setPlayers(state.room.players)
    })
    return () => unsuscribe()
  }, [])
  useEffect(() => {
    const playerId = player.id
    if (store.getState().room.admin === playerId) setIsAdmin(true)
    if (players.every((player) => player.vote !== "none")) setIsComplete(true)
    else setIsComplete(false)
  }, [players])

  useEffect(() => {
    if (store.getState().room.id === "") {
      const roomId = params.id
      connection.emit(
        ioEvents.joinRoom,
        roomId,
        (exists: boolean, room?: room) => {
          if (!exists) navigator("/home")
          else {
            setInitial(false)
            useUpdateRoom(room!)
          }
        }
      )
    }
  }, [])

  const handleVoteClick = (card: string) => {
    setCards((prev) => {
      return prev.map((prevCard) => {
        if (prevCard.content === card) prevCard.voted = true
        else prevCard.voted = false
        return prevCard
      })
    })
    useVote(card)
  }

  const handleCopySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    let link = data.get("link") as string

    try {
      window.navigator.clipboard.writeText(link)
    } catch (error) {
      console.log(error)
    }
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
  const handleInviteClick = () => {
    inviteRef.current?.showModal()
  }

  return (
    <section className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1>{roomName}</h1>
        <section className="room-options">
          <UserAvatar name={player.name ?? "NA"} />
          <Button
            className="invite-button"
            onClick={handleInviteClick}
            content="invitar jugadores"
          />
        </section>
      </header>
      <main className="game-body">
        <Table>
          {isAdmin && (
            <Button
              onClick={isRevealed ? handleResetClick : handleRevealClick}
              disabled={!isComplete}
              content={isRevealed ? "Nueva partida" : "Revelar cartas"}
            />
          )}
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
      <footer
        className={`game-cards ${
          player.type === "spectator" && "spectator-footer"
        }`}
      >
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
      <RoomInitialDialog initial={initial} />
      <FormDialog dialogRef={inviteRef} handleSubmit={handleCopySubmit}>
        <Input name="link" type="text" readonly defaultValue={generateLink()} />
        <Button submit content="Copy link" />
      </FormDialog>
    </section>
  )
}
