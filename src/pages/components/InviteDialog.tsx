import { useEffect, useMemo, useState } from "react"
import { generateLink } from "../../lib/constants/utils"
import Button from "../../system-design/atoms/Button"
import Input from "../../system-design/atoms/Input"
import FormDialog from "../../system-design/templates/FormDialog"
import { store } from "../../lib/store/store"

interface Props {
  inviteRef: React.RefObject<HTMLDialogElement>
}
export default function InviteDialog({ inviteRef }: Props) {
  const [copyMessage, setCopyMessage] = useState("Copiar link")
  const [link, setLink] = useState("")
  const handleCopySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    let link = data.get("link") as string

    try {
      window.navigator.clipboard.writeText(link)
      setCopyMessage("Copiado ✔")
    } catch (error) {
      console.log(error)
      setCopyMessage("Error ❌")
    }
  }
  useEffect(() => {
    const unsuscribe = store.subscribe(() => {
      setLink(generateLink(store.getState().room.id))
    })
    return () => unsuscribe()
  })
  useEffect(() => {
    setLink(generateLink(""))
  }, [])
  return (
    <FormDialog dialogRef={inviteRef} handleSubmit={handleCopySubmit}>
      <Input name="link" type="text" readonly defaultValue={link} />
      <Button submit content={copyMessage} />
    </FormDialog>
  )
}
