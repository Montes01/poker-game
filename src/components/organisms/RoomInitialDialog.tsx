import { useEffect, useRef } from "react"
import { playerType } from "../../lib/constants/declarations"
import FormDialog from "../templates/FormDialog"
import PlayerNameForm from "../templates/PlayerNameForm"
import roomActions from "../../lib/hooks/room/roomActions"

interface Props {
  initial?: boolean
}

export default function RoomInitialDialog({ initial }: Props) {
  const { useAddPlayer } = roomActions()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (initial) dialogRef.current?.showModal()
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
