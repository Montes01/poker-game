import "../assets/components/room.scss"
import "../assets/components/user-form.scss"
import HeadLogo from "../system-design/molecules/HeadLogo"
import UserAvatar from "../system-design/atoms/UserAvatar"
import Button from "../system-design/atoms/Button"
import { useEffect, useMemo,  useState } from "react"
import { store } from "../lib/store/store"
import roomActions from "../lib/hooks/room/roomActions"
import { ioEvents, room, playerType as playType } from "../lib/constants/declarations"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./components/Footer"
import RoomInitialDialog from "../system-design/organisms/RoomInitialDialog"
import { connection } from "../lib/constants/constants"
import Players from "./components/Players"
import InviteDialog from "./components/InviteDialog"
import GameTable from "./components/GameTable"
import playerActions from "../lib/hooks/player/playerActions"
import ResponsiveButtonsDialog from "./components/ResponsiveButtonsDialog"
import { withAuthenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { UseAppSelector } from "../lib/hooks/store"
function Room() {
  const { UseReset, UseUpdateRoom, UseChangePlayerType, UseVote, UseChangeAdmin, UseChangeCards, UseRevealCards } = roomActions()
  const { UseSetIsSpectator, UseSetVote } = playerActions()
  const navigator = useNavigate()
  const params = useParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  const { type: playerType, name: playerName } = UseAppSelector((state) => state.player)
  const { name } = UseAppSelector((state) => state.room)
  useEffect(() => {
    const roomId = params.id
    if (!roomId) navigator("/home")
    connection.emit(
      ioEvents.joinRoom,
      roomId,
      (exists: boolean, room?: room) => {
        if (!exists) navigator("/home")
        else {
          UseUpdateRoom(room!)
        }
      })
  }, [params.id, navigator, UseUpdateRoom])
  useMemo(() => {
    connection.on(ioEvents.vote, (data) => UseVote(data.playerId, data.cardContent))
    connection.on(ioEvents.giveAdmin, (adminId) => UseChangeAdmin(adminId))
    connection.on(ioEvents.changeType, (player) => UseChangePlayerType(player.playerId, player.type))
    connection.on(ioEvents.changeCards, (cards) => UseChangeCards(cards))
    connection.on(ioEvents.reveal, ({ cards }) => UseRevealCards(cards))
    connection.on(ioEvents.reset, () => UseReset())
  }, [])


  const handleInviteClick = () => toggleInviteOpen(true)
  const handleChangeTypeClick = () => {
    const newType = playerType === playType.player ? playType.spectator : playType.player
    connection.emit(
      ioEvents.changeType,
      { roomId: store.getState().room.id, playerId: store.getState().player.id, type: newType },
      (data: { type: keyof typeof playType, playerId: string }) => {
        UseSetIsSpectator(data.type === "spectator")
        if (data.type === "spectator") {
          UseSetVote("spectator")
          UseVote(data.playerId, "spectator")
        } else {
          UseSetVote("none")
          UseVote(data.playerId, "none")
        }
      }
    )
  }
  const handleOpenMenuClick = () => setIsMenuOpen(true)
  const toggleOpen = (open: boolean) => setIsMenuOpen(open)
  const toggleInviteOpen = (open: boolean) => setIsInviteOpen(open)
  return (
    <section role="room" className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1 className="room-name">{name}</h1>
        <section className="room-options">
          <Button
            className="invite-button"
            onClick={handleInviteClick}
            content="invitar jugadores"
          />
          <Button
            className="invite-button change-type-button"
            onClick={handleChangeTypeClick}
            content={`Cambiar a ${playerType === playType.player ? "espectador" : "jugador"}`}
          />
          <UserAvatar action={handleOpenMenuClick} className="header-avatar" name={playerName ?? "NA"} />
        </section>
      </header>
      <main className="game-body">
        <GameTable />
        <Players />
      </main>
      <Footer />
      <InviteDialog open={isInviteOpen} toggleOpen={toggleInviteOpen} />
      <RoomInitialDialog />
      <ResponsiveButtonsDialog open={isMenuOpen} toggleOpen={toggleOpen} toggleOpenInvite={toggleInviteOpen} />
    </section>
  )
}


export default withAuthenticator(Room)