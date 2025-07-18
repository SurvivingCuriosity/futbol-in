import HomePageContainer from "@/client/features/Home/HomePageContainer";
import { LandingPage } from "@/client/features/Landing/LandingPage";
import { UserStatus } from "futbol-in-core/enum";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if(user?.status === UserStatus.MUST_CREATE_USERNAME){
    redirect("/register/init-username");
  }

  const isLoggedIn = !!session;

  return (
    isLoggedIn ? <HomePageContainer user={user} /> : <LandingPage />
  );
}
