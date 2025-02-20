import { HeroSection } from "@/components/Inicio/HeroSection";
import { NavLayout } from "@/components/NavLayout/NavLayout";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);
  

  return (
    <NavLayout loggedIn={!!session}>
      <HeroSection loggedIn={!!session}/>
    </NavLayout>
  );
}
