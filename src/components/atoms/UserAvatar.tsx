import { getFirstUserLetters } from "../../lib/constants/utils"
import "../../assets/components/avatar.scss"
interface Props {
  name: string
  className?: string
  onTable?: boolean
}
export default function UserAvatar({ name, className, onTable }: Props) {
  return (
    <button
      className={`user-avatar ${className} ${onTable ? "table-card" : ""}`}
    >
      <h3 className="user-avatar-name">{getFirstUserLetters(name)}</h3>
      {onTable && <strong className="card-content">{name}</strong>}
    </button>
  )
}
