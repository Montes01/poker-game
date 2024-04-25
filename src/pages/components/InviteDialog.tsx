import { useState } from "react"
import { generateLink } from "../../lib/constants/utils"
import Button from "../../system-design/atoms/Button"
import Input from "../../system-design/atoms/Input"
import FormDialog from "../../system-design/templates/FormDialog"
import { UseAppSelector } from "../../lib/hooks/store"

interface Props {
  open: boolean
  toggleOpen?: (open: boolean) => void
}
export default function InviteDialog({ open, toggleOpen }: Props) {
  const [copyMessage, setCopyMessage] = useState("Copiar link")
  const link = UseAppSelector((state) => generateLink(state.room.id))
  const handleCopySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const link = data.get("link") as string

    try {
      window.navigator.clipboard.writeText(link)
      setCopyMessage("Copiado ✔")
    } catch (error) {
      console.log(error)
      setCopyMessage("Error ❌")
    }
  }


  return (
    <FormDialog toggleOpen={toggleOpen} canClose open={open} handleSubmit={handleCopySubmit}>
      <Input name="link" type="text" readonly defaultValue={link} />
      <Button submit content={copyMessage} />
    </FormDialog>
  )
}
