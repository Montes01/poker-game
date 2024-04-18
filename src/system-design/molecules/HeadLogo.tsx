import Logo from '../atoms/Logo'
import '../../assets/components/head-logo.scss'
import { NavLink } from 'react-router-dom'
interface Props {
  className?: string
  content?: string
}
export default function HeadLogo({ content, className }: Props) {
  return (
    <NavLink role='head-logo' to="/home" className={`head-logo ${className}`}>
      <Logo width="65" height="65" />
      {content && <h1 className="head-title">{content}</h1>}
    </NavLink>
  )
}
