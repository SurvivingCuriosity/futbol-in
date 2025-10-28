import { ArrowRight, Smartphone } from "lucide-react"

interface CTAProps {
  city?: string
}

export function CTA({ city }: CTAProps) {
  return (
    <section id="descargar" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent" />
          <div className="absolute inset-0 bg-[url('/foosball-pattern-texture.jpg')] opacity-5" />

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-18 md:py-28">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Empieza a descubrir futbolines{" "}
                {city && (
                  <>
                    en <span className="text-accent">{city}</span>
                  </>
                )}{" "}
                hoy
              </h2>

              <p className="text-xl text-muted-foreground text-pretty">
                Únete a la comunidad más grande de jugadores de futbolín. Descarga la app gratis y encuentra tu próxima
                partida.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 h-14 group flex items-center"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Descargar App
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className="rounded-xl border-accent/30 hover:bg-accent/10 text-lg px-8 h-14 bg-transparent"
                >
                  Ver Demo
                </button>
              </div>

              {/* App Badges */}
              <div className="flex items-center justify-center gap-4 pt-8">
                <div className="px-6 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                  <p className="text-sm text-muted-foreground">Disponible en iOS y Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
