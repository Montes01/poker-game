import '../../assets/components/home.scss'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('hola')
  }
  return (
    <main className="page-wrapper home-page-wrapper">
      <form onSubmit={handleSubmit} className="base-form">
        <Input name="room-name" type="text" label="crea la partida" />
        <Button content="Crear partida" submit />
      </form>
    </main>
  )
}
