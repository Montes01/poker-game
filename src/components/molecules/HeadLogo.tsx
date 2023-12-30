import Logo from '../atoms/Logo'
import '../../assets/components/head-logo.scss'
import { NavLink } from 'react-router-dom'
interface Props {
  content?: string
}
export default function HeadLogo({ content }: Props) {
  return (
    <NavLink to="/home" className="head-logo">
      <Logo width="50" height="50" />
      {content && <h1 className="head-title">{content}</h1>}
    </NavLink>
  )
}
