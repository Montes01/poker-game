import { useState } from 'react'
import '../../assets/components/home.scss'
import { validateName } from '../../lib/constants/utils'

import Button from '../atoms/Button'
import Input from '../atoms/Input'
import HeadLogo from '../molecules/HeadLogo'
import WarningIcon from '../atoms/WarningIcon'
export default function Home() {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
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
    const roomName = form.get('room-name')!.toString()
    alert(roomName)
  }
  return (
    <main className="page-wrapper home-page-wrapper">
      <header className="home-header">
        <HeadLogo content="Crear partida" />
      </header>
      <form onSubmit={handleSubmit} className="base-form">
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
      </form>
    </main>
  )
}
