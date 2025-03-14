import { RegisterForm } from "@/client/features/Auth/Register/RegisterForm";
import { UserStatus } from "@/core/enum/User/Status";
import { authOptions } from "@/server/lib/authOptions";
import { verifyRegistrationToken } from "@/server/lib/authToken";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("registrationToken")?.value;

  const session = await getServerSession(authOptions);
  if (session && session.user) {
    if(session.user.status === UserStatus.DONE){
      redirect('/')
    }
    if(session.user.status === UserStatus.MUST_CREATE_USERNAME){
      redirect('/register/init-username')
    }
  }

  try {
    if (token) {
      const { userId } = verifyRegistrationToken(token || "");
      if (userId) {
        const user = await UserService.findById(userId);
        if (user) {
          if (user.status === UserStatus.MUST_INIT_ACCOUNT) {
            redirect("/register/init-account");
            return null;
          }

          if (user.status === UserStatus.MUST_CONFIRM_EMAIL) {
            redirect("/register/confirm-email");
            return null;
          }

          if (user.status === UserStatus.DONE) {
            redirect("/");
            return null;
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return <RegisterForm />;
};

export default RegisterPage;
