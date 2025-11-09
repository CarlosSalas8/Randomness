"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  onAddToCart: (product: Product) => void
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blazer Clásico",
    price: 18900,
    image: "/elegant-black-blazer-jacket-on-white-background.jpg",
    category: "Mujer",
  },
  {
    id: 2,
    name: "Vestido Midi",
    price: 14500,
    image: "/elegant-midi-dress-beige-color-on-white-background.jpg",
    category: "Mujer",
  },
  {
    id: 3,
    name: "Pantalón Palazzo",
    price: 12900,
    image: "/elegant-palazzo-pants-cream-color-on-white-backgro.jpg",
    category: "Mujer",
  },
  {
    id: 4,
    name: "Camisa de Lino",
    price: 8900,
    image: "/elegant-linen-shirt-white-on-white-background.jpg",
    category: "Hombre",
  },
  {
    id: 5,
    name: "Trench Coat",
    price: 24900,
    image: "/elegant-trench-coat-beige-on-white-background.jpg",
    category: "Mujer",
  },
  {
    id: 6,
    name: "Jersey Cashmere",
    price: 16900,
    image: "/elegant-cashmere-sweater-gray-on-white-background.jpg",
    category: "Hombre",
  },
  {
    id: 7,
    name: "Falda Plisada",
    price: 11500,
    image: "/elegant-pleated-skirt-black-on-white-background.jpg",
    category: "Mujer",
  },
  {
    id: 8,
    name: "Bolso de Mano",
    price: 19900,
    image: "/elegant-leather-handbag-brown-on-white-background.jpg",
    category: "Accesorios",
  },
]

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [filter, setFilter] = useState<string>("Todos")

  const categories = ["Todos", "Mujer", "Hombre", "Accesorios"]
  const filteredProducts = filter === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light tracking-tight mb-4">Nueva Colección</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Piezas cuidadosamente seleccionadas para cada ocasión</p>
      </div>

      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </section>
  )
}
