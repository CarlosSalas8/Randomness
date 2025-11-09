import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <img src="/elegant-fashion-model-in-minimalist-clothing-studi.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center space-y-6 px-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white text-balance">Elegancia atemporal</h1>
        <p className="text-lg md:text-xl text-white/90 font-light text-pretty">
          Descubre nuestra colección exclusiva de prendas diseñadas para destacar tu estilo único
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-white text-foreground hover:bg-white/90">
            Explorar colección
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
            Ver lookbook
          </Button>
        </div>
      </div>
    </section>
  )
}
