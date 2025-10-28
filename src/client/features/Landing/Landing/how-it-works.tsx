import { UserPlus, MailPlus as MapPinPlus, Trophy, Share2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Crea tu cuenta",
    description:
      "Regístrate gratis en segundos y únete a la comunidad de jugadores de futbolín.",
  },
  {
    icon: MapPinPlus,
    number: "02",
    title: "Añade futbolines",
    description:
      "Encuentra un futbolín en un bar y añádelo al mapa. Indica el tipo de futbolín y agrega comentarios.",
  },
  {
    icon: Trophy,
    number: "03",
    title: "Sube en el ranking",
    description:
      "Cada futbolín que añadas suma puntos. Compite por ser el número uno de tu ciudad.",
  },
  {
    icon: Share2,
    number: "04",
    title: "Comparte y juega",
    description:
      "Invita a tus amigos, descubre nuevos lugares y disfruta del mejor futbolín.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Cómo funciona <span className="text-accent">Futbol-in</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Cuatro pasos simples para empezar a disfrutar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/5 right-0 w-1/2 h-0.5 bg-gradient-to-r to-accent/50 from-transparent" />
              )}

              <div className="relative space-y-6">
                <div className="flex items-center gap-2">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/30">
                    <span className="text-2xl font-bold text-accent">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-border">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
