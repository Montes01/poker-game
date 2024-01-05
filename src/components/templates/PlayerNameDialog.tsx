import { useState } from "react"
import { playerType } from "../../lib/constants/declarations"
import { validateName } from "../../lib/constants/utils"
import Button from "../atoms/Button"
import Input from "../atoms/Input"
import RadioButton from "../atoms/RadioButton"
import WarningIcon from "../atoms/WarningIcon"
interface Props {
  dialogRef: React.RefObject<HTMLDialogElement>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
export default function PlayerNameDialog({ dialogRef, handleSubmit }: Props) {
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
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  return (
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
            value={playerType.player}
            label="jugador"
            name="user-type"
            defaultChecked
          />
          <RadioButton
            value={playerType.spectator}
            label="espectador"
            name="user-type"
          />
        </section>
        <Button disabled={!isValid ?? false} content="continuar" submit />
      </form>
    </dialog>
  )
}
