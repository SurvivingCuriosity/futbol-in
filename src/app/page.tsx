import HomePage from "@/client/features/Home/HomePage";
import { LandingPage } from "@/client/features/Landing/LandingPage";
import { UserStatus } from "@/core/enum/User/Status";
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
    isLoggedIn ? <HomePage /> : <LandingPage />
  );
}
