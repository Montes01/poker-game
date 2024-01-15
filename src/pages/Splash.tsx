import { useNavigate } from 'react-router-dom'
import { COMPANY_NAME } from '../lib/constants/constants'
import { useEffect } from 'react'
import Logo from '../system-design/atoms/Logo'

export default function Splash() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 2500)
  }, [navigate])
  return (
    <main className="page-wrapper splash-page-wrapper">
      <Logo width="80" height="80" />
      <h1 className="splash-title">{COMPANY_NAME}</h1>
    </main>
  )
}
