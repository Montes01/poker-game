import FormDialog from "../../system-design/templates/FormDialog"
import { cardTypes, ioEvents } from "../../lib/constants/declarations"
import { useEffect, useState } from "react"
import Button from "../../system-design/atoms/Button"
import RadioButton from "../../system-design/atoms/RadioButton"
import { connection } from "../../lib/constants/constants"
import { store } from "../../lib/store/store"
import { generateCards } from "../../lib/constants/utils"
interface Props {
  isOpen: boolean
}
export default function ChangeCardsDialog({ isOpen }: Props) {
  const [cards, setCards] = useState<string[]>([])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const cardsType = data.get("cardsType") as keyof typeof cardTypes
    connection.emit(ioEvents.changeCards, {
      roomId: store.getState().room.id,
      cards: generateCards(cardsType),
    })
  }
  useEffect(() => {
    setCards([])
    for (const card in cardTypes) {
      setCards((prev) => [...prev, card])
    }
  }, [])
  return (
    <FormDialog open={isOpen} handleSubmit={handleSubmit}>
      <section className="card-types-radio-buttons">
        {cards.map((card) => (
          <RadioButton label={card} name="cardsType" value={card} key={card} />
        ))}
      </section>
      <Button submit content="confirmar" />
    </FormDialog>
  )
}
