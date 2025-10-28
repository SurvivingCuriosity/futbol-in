import { MapPin, Trophy, Users } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Mapa Interactivo",
    description:
      "Encuentra futbolines cerca de ti con nuestro mapa en tiempo real. Filtra por tipo de futbolín y distancia.",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete al resto de jugadores. Comparte ubicaciones, valora bares y conecta con otros aficionados.",
  },
  {
    icon: Trophy,
    title: "Ranking Global",
    description: "Compite por ser el usuario que más futbolines ha añadido. Gana insignias y reconocimiento.",
  }
]

export function Features() {
  return (
    <section id="caracteristicas" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Todo lo que necesitas para encontrar tu <span className="text-accent">futbolín favorito</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Una plataforma completa diseñada por y para amantes del futbolín
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-6 inline-flex p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
