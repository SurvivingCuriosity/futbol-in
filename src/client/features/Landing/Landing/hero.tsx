import { MapPin, Users } from "lucide-react";

import { SpotDTO } from "futbol-in-core/types";
import Image from "next/image";
import { MapaLanding } from "./MapaLanding";
import Typewriter from "./TypeWriter";

interface HeroProps {
  spots?: SpotDTO[];
  users?: number;
}

export async function Hero({ spots, users }: HeroProps) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/foosball-table-view-from-goal-perspective-dark-moo.jpg"
          alt="Futbolín vista desde el fondo"
          className="w-full h-full object-cover opacity-30"
          width={300}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-3 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">
                Únete a la comunidad
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <Typewriter />
            </h1>

            <p className="md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Descubre futbolines cerca de ti. Añade tus favoritos al mapa y
              compite en el ranking con la comunidad de jugadores.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold sm:text-lg px-3 h-10 sm:px-8 sm:h-14">
                Explorar Mapa
              </button>
              <button className="rounded-xl border-accent/30 hover:bg-accent/10 sm:text-lg px-3 h-10 sm:px-8 sm:h-14 bg-transparent">
                Añadir Futbolín
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <MapPin className="w-5 h-5" />
                  <span className="text-3xl font-bold">{spots?.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Futbolines</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent">
                  <Users className="w-5 h-5" />
                  <span className="text-3xl font-bold">{users}</span>
                </div>
                <p className="text-sm text-muted-foreground">Usuarios</p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Map */}
          <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <MapaLanding markers={spots ?? []} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </section>
  );
}
