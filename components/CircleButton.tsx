// components/CircularButton.jsx
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CircularButton({ onClick }:{onClick?: (param?:any)=>void}) {
  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full p-0 shadow-lg"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}