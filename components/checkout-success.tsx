"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"

interface CheckoutSuccessProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

export function CheckoutSuccess({ isOpen, onClose, total }: CheckoutSuccessProps) {
  const { user } = useAuth()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <DialogTitle className="text-2xl">¡Compra realizada con éxito!</DialogTitle>
          <div className="space-y-2 pt-4 text-muted-foreground text-sm">
            <p className="text-base">
              Gracias por tu compra, <span className="font-semibold">{user}</span>
            </p>
            <p className="text-lg font-semibold">Total: ${total.toLocaleString("es-AR")}</p>
            <p className="text-sm text-muted-foreground pt-2">
              Recibirás un correo de confirmación con los detalles de tu pedido.
            </p>
          </div>
        </DialogHeader>
        <Button onClick={onClose} className="w-full mt-4">
          Continuar comprando
        </Button>
      </DialogContent>
    </Dialog>
  )
}
