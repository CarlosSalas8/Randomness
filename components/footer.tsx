export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">ELEGANTE</h3>
            <p className="text-sm text-muted-foreground">Moda elegante y atemporal para quienes aprecian la calidad.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Mujer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Hombre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Accesorios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Guía de tallas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Suscríbete para recibir ofertas exclusivas</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ELEGANTE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
