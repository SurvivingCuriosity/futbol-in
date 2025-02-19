import { HeroSection } from "@/components/Inicio/HeroSection";
import { NavLayout } from "@/components/NavLayout/NavLayout";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <HeroSection loggedIn={!!session}/>
    </NavLayout>
  );
}
