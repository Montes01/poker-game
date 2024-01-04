import "../../assets/components/room.scss"
import "../../assets/components/user-form.scss"
import HeadLogo from "../molecules/HeadLogo"
import UserAvatar from "../atoms/UserAvatar"
import Button from "../atoms/Button"
import Table from "../atoms/Table"
import Input from "../atoms/Input"
import RadioButton from "../atoms/RadioButton"
import { useEffect, useRef, useState } from "react"
import { validateName } from "../../lib/constants/utils"
import WarningIcon from "../atoms/WarningIcon"
import { store } from "../../lib/store/store"

export default function Room() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [roomName, setRoomName] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    try {
      validateName(value)
      setIsValid(true)
    } catch (error) {
      setIsValid(false)
      setErrorMessage((error as Error).message)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  useEffect(() => {
    dialogRef.current?.showModal()
    setRoomName(store.getState().room.name)
  }, [])
  return (
    <section className="page-wrapper">
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
      <dialog ref={dialogRef} className="user-form-dialog">
        <form onSubmit={handleSubmit} className="user-form">
          <Input
            onChange={handleChange}
            type="text"
            name="username"
            label="Tu nombre"
          >
            {!isValid && isValid != null && (
              <WarningIcon title={errorMessage} width="15" height="15" />
            )}
          </Input>
          <section className="user-type-buttons">
            <RadioButton
              value="player"
              label="jugador"
              name="user-type"
              defaultChecked
            />
            <RadioButton
              value="spectator"
              label="espectador"
              name="user-type"
            />
          </section>
          <Button disabled={!isValid ?? false} content="continuar" submit />
        </form>
      </dialog>
    </section>
  )
}
