import { HeroSection } from "@/components/Inicio/HeroSection";
import { NavLayout } from "@/components/NavLayout/NavLayout";
import AppStatus from "@/features/AppStatus/AppStatus";
import { UserStatus } from "@/shared/enum/User/Status";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  
  console.log('El user',user);

  if(user?.status === UserStatus.MUST_CREATE_USERNAME){
    redirect("/register/init-username");
  }

  return (
    <NavLayout loggedIn={!!session}>
      <HeroSection loggedIn={!!session} />
      <AppStatus />
    </NavLayout>
  );
}
