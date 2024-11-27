import { Loader2, XIcon } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "./Button"

export function DeleteButton() {
  const { pending } = useFormStatus()
  const Icon = pending ? Loader2 : XIcon

  return (
    <Button
      size="icon"
      variant="destructive"
      disabled={pending}
      aria-label={pending ? "Deleting..." : "Delete"}
    >
      <Icon className={`size-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  )
}
