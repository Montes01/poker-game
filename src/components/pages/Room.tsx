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
import { playerType } from "../../lib/constants/declarations"
export default function Room() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [roomName, setRoomName] = useState("")
  const { useAddPlayer } = roomActions()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    useAddPlayer(username, userType)
    dialogRef.current?.close()
    dialogRef.current!.style.display = "none"
    
  }
  useEffect(() => {
    dialogRef.current?.showModal()
    setRoomName(store.getState().room.name)
  }, [])
  return (
    <section className="page-wrapper room-page-wrapper">
      <header className="room-header">
        <section className="room-logo">
          <HeadLogo />
        </section>
        <h1>{roomName}</h1>
        <section className="room-options">
          <UserAvatar name="example" />
          <Button className="invite-button" content="invitar jugadores" />
        </section>
      </header>
      <main className="game-body">
        <Table />
      </main>
      <footer className="game-cards"></footer>
      <PlayerNameDialog dialogRef={dialogRef} handleSubmit={handleSubmit} />
    </section>
  )
}
