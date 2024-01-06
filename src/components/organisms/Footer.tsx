import { Card as CardType } from "../../lib/constants/declarations"
import Card from "../atoms/Card"

interface Props {
  cards: CardType[]
  vote: (card: string) => void
  revealed?: boolean
}
export default function Footer({ cards, vote, revealed }: Props) {
  return (
    <>
      {cards.map((card) => (
        <Card
          vote={card.voted && !revealed ? "1" : "none"}
          onClick={() => vote(card.content)}
          content={card.content}
          key={card.content}
          voteCount={card.count ?? undefined}
        />
      ))}
    </>
  )
}
