interface Props {
  onTable?: boolean
  content: React.ReactNode
  vote?: string
  className?: string
  onClick?: () => void
}
export default function Card({
  content,
  onTable,
  className,
  vote,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`game-card ${className}
       ${onTable ? "table-card" : ""} ${vote && vote !== "none" ? "voted" : ""}`}
    >
      <strong className="card-content">{content}</strong>
    </button>
  )
}
