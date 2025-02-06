import { HeroSection } from "@/components/Inicio/HeroSection";
import { TarjetaFutbolinInicio } from "@/components/Inicio/TarjetaFutbolinInicio";
import { TopNav } from "@/components/Inicio/TopNav";

export default function Home() {
  return (
    <div className="bg-neutral-900 min-h-dvh">
      <TopNav />
      <HeroSection />
      <h2 className="text-orange-600 text-2xl font-bold m-4">Recomendados:</h2>
      <ul className="flex overflow-scroll gap-2 max-w-scree-lg mx-4 snap-x">
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
      </ul>
    </div>
  );
}
