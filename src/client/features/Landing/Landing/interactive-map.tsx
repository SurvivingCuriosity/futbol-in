
import { MapPin } from "lucide-react"
import Image from "next/image"

interface InteractiveMapProps {
  city?: string
}

export function InteractiveMap({ city }: InteractiveMapProps) {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background">
        <Image
          src="/dark-map-interface-with-pins-modern-ui.jpg"
          alt={`Mapa de futbolines ${city ? `en ${city}` : ""}`}
          className="w-full h-full object-cover opacity-60"
          width={300}
          height={300}
        />
      </div>

      {/* Map Pins */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {[
            { top: "25%", left: "30%" },
            { top: "45%", left: "60%" },
            { top: "60%", left: "35%" },
            { top: "35%", left: "70%" },
            { top: "70%", left: "55%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.2}s` }}
            >
              <div className="relative">
                <MapPin className="w-8 h-8 text-accent drop-shadow-lg" fill="currentColor" />
                <div className="absolute -inset-2 bg-accent/20 rounded-full blur-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="w-10 h-10 rounded-lg bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent/10 transition-colors">
          <span className="text-lg font-bold">−</span>
        </button>
      </div>

      {/* Location Badge */}
      <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-sm font-medium">{city || "Tu ubicación"}</span>
      </div>
    </div>
  )
}
