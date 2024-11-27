import { Loader2, XIcon } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "./Button"

export function DeleteButton() {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    if (pending) <Loader2 className="size-4 animate-spin" />
    return <XIcon className="size-4" />
  }

  return (
    <Button size="icon" variant="destructive" disabled={pending}>
      {renderIcon()}
    </Button>
  )
}
