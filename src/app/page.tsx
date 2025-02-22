import { HeroSection } from "@/components/Inicio/HeroSection";
import { NavLayout } from "@/components/NavLayout/NavLayout";
import AppStatus from "@/features/AppStatus/AppStatus";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <NavLayout loggedIn={!!session}>
      <HeroSection loggedIn={!!session} />
      <AppStatus />
    </NavLayout>
  );
}
