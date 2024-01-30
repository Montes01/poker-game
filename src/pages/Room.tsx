import "../assets/components/room.scss"
import "../assets/components/user-form.scss"
import HeadLogo from "../system-design/molecules/HeadLogo"
import UserAvatar from "../system-design/atoms/UserAvatar"
import Button from "../system-design/atoms/Button"
import { useEffect, useRef, useState } from "react"
import { store } from "../lib/store/store"
import roomActions from "../lib/hooks/room/roomActions"
import { ioEvents, room, playerType as playType } from "../lib/constants/declarations"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./components/Footer"
import RoomInitialDialog from "../system-design/organisms/RoomInitialDialog"
import { connection } from "../App"
import Players from "./components/Players"
import InviteDialog from "./components/InviteDialog"
import GameTable from "./components/GameTable"
import playerActions from "../lib/hooks/player/playerActions"

export default function Room() {
  const { useReset, useUpdateRoom, useChangePlayerType, useAddPlayer, useVote, useChangeAdmin, useChangeCards, useRevealCards } = roomActions()
  const { useSetIsSpectator, useSetVote } = playerActions()
  const navigator = useNavigate()
  const params = useParams()
  const inviteRef = useRef<HTMLDialogElement>(null)
  const [playerName, setPlayerName] = useState(store.getState().player.name)
  const [playerType, setPlayerType] = useState(store.getState().player.type)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    const roomId = params.id
    connection.emit(
      ioEvents.joinRoom,
      roomId,
      (exists: boolean, room?: room) => {
        if (!exists) navigator("/home")
        else {
          useUpdateRoom(room!)
        }
      })
  }, [])
  useEffect(() => {
    connection.on(ioEvents.addPlayer, (player) => useAddPlayer(player))
    connection.on(ioEvents.vote, (data) => useVote(data.playerId, data.cardContent))
    connection.on(ioEvents.giveAdmin, (adminId) => useChangeAdmin(adminId))
    connection.on(ioEvents.changeType, (player) => useChangePlayerType(player.playerId, player.type))
    connection.on(ioEvents.changeCards, (cards) => useChangeCards(cards))
    connection.on(ioEvents.reveal, ({ cards }) => useRevealCards(cards))
    connection.on(ioEvents.reset, () => useReset())
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

  const handleInviteClick = () => inviteRef.current?.showModal()
  const handleChangeTypeClick = () => {
    const newType = playerType === playType.player ? playType.spectator : playType.player
    connection.emit(
      ioEvents.changeType,
      { roomId: store.getState().room.id, playerId: store.getState().player.id, type: newType },
      (data: { type: keyof typeof playType, playerId: string }) => {
        useSetIsSpectator(data.type === "spectator")
        if (data.type === "spectator") {
          useSetVote("spectator")
          useVote(data.playerId, "spectator")
        } else {
          useSetVote("none")
          useVote(data.playerId, "none")
        }
      }
    )

  }
  return (
    <section className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1 className="room-name">{roomName}</h1>
        <section className="room-options">
          <UserAvatar name={playerName ?? "NA"} />
          <Button
            className="invite-button"
            onClick={handleInviteClick}
            content="invitar jugadores"
          />
        </section>
      </header>
      <main className="game-body">
        <GameTable />
        <Players />
      </main>
          <Button
            className="invite-button change-type-button"
            onClick={handleChangeTypeClick}
            content={`Cambiar a ${playerType === playType.player ? "espectador" : "jugador"}`}
          />
      <Footer />
      <InviteDialog inviteRef={inviteRef} />
      <RoomInitialDialog />
    </section>
  )
}
