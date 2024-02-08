import FormDialog from "../../system-design/templates/FormDialog"
import { cardTypes, ioEvents } from "../../lib/constants/declarations"
import { useEffect, useState } from "react"
import Button from "../../system-design/atoms/Button"
import RadioButton from "../../system-design/atoms/RadioButton"
import { connection } from "../../App"
import { store } from "../../lib/store/store"
import { generateCards } from "../../lib/constants/utils"
interface Props {
  changeCardsRef: React.RefObject<HTMLDialogElement>
}
export default function ChangeCardsDialog({ changeCardsRef }: Props) {
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
    for (let card in cardTypes) {
      setCards((prev) => [...prev, card])
    }
  }, [])
  return (
    <FormDialog dialogRef={changeCardsRef} handleSubmit={handleSubmit}>
      <section className="card-types-radio-buttons">
        {cards.map((card) => (
          <RadioButton label={card} name="cardsType" value={card} key={card} />
        ))}
      </section>
      <Button submit content="confirmar" />
    </FormDialog>
  )
}
