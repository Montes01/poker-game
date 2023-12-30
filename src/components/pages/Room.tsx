import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../assets/components/room.scss'
import HeadLogo from '../molecules/HeadLogo'
import UserAvatar from '../atoms/UserAvatar'
import Button from '../atoms/Button'

export default function Room() {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (!id) {
      navigate('/home')
    }
  })
  return (
    <main className="page-wrapper">
      <header className="room-header">
        <HeadLogo className='room-logo' />
        <h1>Game Name</h1>
        <section className="room-options">
          <UserAvatar name="example" />
          <Button className="invite-button" content="invitar jugadores" />
        </section>
      </header>
    </main>
  )
}
