interface Props {
  onTable?: boolean
  content: React.ReactNode
  vote?: number
  className?: string
}
export default function Card({ content, onTable, className, vote }: Props) {
  return (
    <section
      className={`game-card ${className}
       ${onTable ? "table-card" : ""} ${vote && vote !== 0 ? "voted" : ""}`}
    >
      <strong className="card-content">{content}</strong>
    </section>
  )
}
