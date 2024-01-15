import { useState } from "react"
import { generateLink } from "../../lib/constants/utils"
import Button from "../../system-design/atoms/Button"
import Input from "../../system-design/atoms/Input"
import FormDialog from "../../system-design/templates/FormDialog"

interface Props {
  inviteRef: React.RefObject<HTMLDialogElement>
}
export default function InviteDialog({ inviteRef }: Props) {
  const [copyMessage, setCopyMessage] = useState("Copy link")
  const handleCopySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    let link = data.get("link") as string

    try {
      window.navigator.clipboard.writeText(link)
      setCopyMessage("Copied ✔")
    } catch (error) {
      console.log(error)
      setCopyMessage("Error ❌")
    }
  }
  return (
    <FormDialog dialogRef={inviteRef} handleSubmit={handleCopySubmit}>
      <Input name="link" type="text" readonly defaultValue={generateLink()} />
      <Button submit content={copyMessage} />
    </FormDialog>
  )
}
