interface Props {
  onTable?: boolean
  content: React.ReactNode
  vote?: string
  className?: string
  onClick?: () => void
  voteCount?: number
}
export default function Card({
  content,
  onTable,
  className,
  vote,
  onClick,
  voteCount,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`game-card ${className}
       ${onTable ? "table-card" : ""} ${
        vote && vote !== "none" ? "voted" : ""
      }`}
    >
      <strong className="card-content">{content}</strong>
     {voteCount &&  <strong className="vote-count">Votos: {voteCount}</strong>}
    </button>
  )
}
