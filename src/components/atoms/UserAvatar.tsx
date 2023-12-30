import { getFirstUserLetters } from '../../lib/constants/utils'
import '../../assets/components/avatar.scss'
interface Props {
  name: string
}
export default function UserAvatar({ name }: Props) {
  return (
    <article className="user-avatar">
      <h3 className="user-avatar-name">{getFirstUserLetters(name)}</h3>
    </article>
  )
}
