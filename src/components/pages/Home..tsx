import '../../assets/components/home.scss'
export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('hola')
  }
  return (
    <main className="page-wrapper home-page-wrapper">
      <form onSubmit={handleSubmit} className="base-form">
        <label className="input-with-label">
          Nombra la partida
          <input className="basic-input" type="text" />
        </label>
        <button>Crear partida</button>
      </form>
    </main>
  )
}
