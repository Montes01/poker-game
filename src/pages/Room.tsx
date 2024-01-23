import "../assets/components/room.scss"
import "../assets/components/user-form.scss"
import HeadLogo from "../system-design/molecules/HeadLogo"
import UserAvatar from "../system-design/atoms/UserAvatar"
import Button from "../system-design/atoms/Button"
import { useEffect, useRef, useState } from "react"
import { store } from "../lib/store/store"
import roomActions from "../lib/hooks/room/roomActions"
import { ioEvents, room } from "../lib/constants/declarations"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./components/Footer"
import RoomInitialDialog from "../system-design/organisms/RoomInitialDialog"
import { connection } from "../App"
import Players from "./components/Players"
import InviteDialog from "./components/InviteDialog"
import GameTable from "./components/GameTable"
import playerActions from "../lib/hooks/player/playerActions"

export default function Room() {
  const navigator = useNavigate()
  const params = useParams()
  const inviteRef = useRef<HTMLDialogElement>(null)
  const [playerName, setPlayerName] = useState(store.getState().player.name)
  const [playerType, setPlayerType] = useState(store.getState().player.type)
  const [roomName, setRoomName] = useState("")
  const { useUpdateRoom, useChangeType } = roomActions()
  const { useRemoveVote } = playerActions()
  useEffect(() => {
    connection.on(ioEvents.updateRoom, (room: room) => useUpdateRoom(room))
    connection.on(ioEvents.reset, () => useRemoveVote())
  }, [])

  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      const state = store.getState()
      setPlayerType(state.player.type)
      setRoomName(state.room.name)
      setPlayerName(state.player.name)
    })
    return () => unsuscribe()
  }, [])

  useEffect(() => {
    if (store.getState().room.id === "") {
      const roomId = params.id
      connection.emit(
        ioEvents.joinRoom,
        roomId,
        (exists: boolean, room?: room) => {
          if (!exists) navigator("/home")
          else {
            useUpdateRoom(room!)
          }
        }
      )
    }
  }, [])

  const handleInviteClick = () => inviteRef.current?.showModal()
  const handleChangeTypeClick = () => {
    const type = store.getState().player.type
    if (type === "player") useChangeType(store.getState().player.id, "spectator")
    else useChangeType(store.getState().player.id, "player")
  }
  return (
    <section className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1>{roomName}</h1>
        <section className="room-options">
          <UserAvatar name={playerName ?? "NA"} />
          <Button
            className="invite-button"
            onClick={handleInviteClick}
            content="invitar jugadores"
          />
          <Button
            className="invite-button"
            onClick={handleChangeTypeClick}
            content={`Cambiar a ${playerType === "player" ? "espectador" : "jugador"}`}
          />
        </section>
      </header>
      <main className="game-body">
        <GameTable />
        <Players />
      </main>
      <Footer />
      <InviteDialog inviteRef={inviteRef} />
      <RoomInitialDialog />
    </section>
  )
}
