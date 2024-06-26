import { useMemo, useState } from "react"
import "../assets/components/home.scss"
import { validateName } from "../lib/constants/utils"
import roomActions from "../lib/hooks/room/roomActions"
import Button from "../system-design/atoms/Button"
import Input from "../system-design/atoms/Input"
import HeadLogo from "../system-design/molecules/HeadLogo"
import WarningIcon from "../system-design/atoms/WarningIcon"
import { useNavigate } from "react-router-dom"
import { connection } from "../lib/constants/constants"
import { ioEvents, room } from "../lib/constants/declarations"
export default function Home() {
  const navigator = useNavigate()
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { UseCreateRoom } = roomActions()
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
    const form = new FormData(e.currentTarget)
    const roomName = form.get("room-name")!.toString()
    UseCreateRoom(roomName)
    setLoading(true)
  }
  useMemo(() => {
    connection.on(ioEvents.createRoom, (room: room) => navigator(`/room/${room.id}`))
  }, [navigator])

  return (
    <main className="page-wrapper home-page-wrapper">
      <header className="home-header">
        <HeadLogo content="Crear partida" />
      </header>
      <form onSubmit={handleSubmit} className="base-form">
        {loading ? <h2>Creando partida...</h2> : (
          <>
            <Input
              onChange={handleChange}
              name="room-name"
              type="text"
              label="Nombra la partida"
            >
              {!isValid && isValid != null && (
                <WarningIcon title={errorMessage} width="15" height="15" />
              )}
            </Input>
            <Button disabled={!isValid ?? false} content="Crear partida" submit />
          </>
        )}
      </form>
    </main>
  )
}
