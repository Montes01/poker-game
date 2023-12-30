import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
      <h2>gello world</h2>
    </main>
  )
}
