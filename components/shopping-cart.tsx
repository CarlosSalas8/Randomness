"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { CartItem } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckoutSuccess } from "@/components/checkout-success"

interface ShoppingCartProps {
  items: CartItem[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onClearCart: () => void
}

export function ShoppingCart({ items, isOpen, onClose, onUpdateQuantity, onClearCart }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const { isAuthenticated, token } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para finalizar tu compra",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsProcessing(true)

    // Simular llamada a API con delay
    setTimeout(() => {
      console.log("[v0] Procesando compra con token:", token)
      console.log("[v0] Productos:", items)
      console.log("[v0] Total:", total)

      setIsProcessing(false)
      setShowSuccess(true)

      setTimeout(() => {
        onClearCart()
      }, 2000)
    }, 1500)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    onClose()
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrito de compras
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="font-semibold mt-1">${item.price.toLocaleString("es-AR")}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, 0)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                  {isProcessing ? "Procesando..." : "Finalizar compra"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                  Continuar comprando
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutSuccess isOpen={showSuccess} onClose={handleCloseSuccess} total={total} />
    </>
  )
}
