import HomePage from "@/features/Home/HomePage";
import { LandingPage } from "@/features/Landing/LandingPage";
import { NavLayout } from "@/shared/components/Layouts/NavLayout";
import { UserStatus } from "@/shared/enum/User/Status";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import '@/shared/components/BottomDrawer/Drawer.css';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if(user?.status === UserStatus.MUST_CREATE_USERNAME){
    redirect("/register/init-username");
  }

  const isLoggedIn = !!session;

  return (
    <NavLayout loggedIn={isLoggedIn}>
      {isLoggedIn ? <HomePage /> : <LandingPage />}
    </NavLayout>
  );
}
