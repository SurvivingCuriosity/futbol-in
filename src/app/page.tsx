import { BottomNavLayout } from "@/components/BottomNavLayout/BottomNavLayout";
import { HeroSection } from "@/components/Inicio/HeroSection";
import { TarjetaFutbolinInicio } from "@/components/Inicio/TarjetaFutbolinInicio";
import { TopNav } from "@/components/Inicio/TopNav";
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const session = await getServerSession();

  return (
    <BottomNavLayout loggedIn={!!session}>
      <TopNav />
      <HeroSection />
      <h2 className="text-lime-300 text-2xl font-bold m-4">Recomendados:</h2>
      <ul className="flex overflow-scroll gap-2 max-w-scree-lg mx-4 snap-x">
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
        <TarjetaFutbolinInicio />
      </ul>
    </BottomNavLayout>
  );
}
