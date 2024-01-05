interface Props {
  onTable?: boolean
  content: React.ReactNode
}
export default function Card({ content, onTable }: Props) {
  return (
    <section className={`game-card ${onTable ? "table-card" : ""}`}>
      {content}
    </section>
  )
}
