import { useEffect, useRef } from "react"
import { playerType } from "../../lib/constants/declarations"
import FormDialog from "../templates/FormDialog"
import PlayerNameForm from "../templates/PlayerNameForm"
import roomActions from "../../lib/hooks/room/roomActions"

export default function RoomInitialDialog() {
  const { useAddPlayer } = roomActions()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userType = formData.get("user-type")! as keyof typeof playerType
    const username = formData.get("username")!.toString()
    useAddPlayer(username, userType)
    dialogRef.current?.close()
  }
  return (
    <FormDialog dialogRef={dialogRef} handleSubmit={handleSubmit}>
      <PlayerNameForm />
    </FormDialog>
  )
}
