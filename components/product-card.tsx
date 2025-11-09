"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-accent transition-all duration-300">
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium mb-2">{product.name}</h3>
        <p className="text-lg font-semibold">${product.price.toLocaleString("es-AR")}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onAddToCart} className="w-full bg-transparent" variant="outline">
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
