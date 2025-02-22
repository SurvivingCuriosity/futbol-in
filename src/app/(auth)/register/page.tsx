import { RegisterForm } from "@/features/Auth/Register/RegisterForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import { User } from "@/shared/models/User/User.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("registrationToken")?.value;

  try {
    if (token) {
      const { userId } = verifyRegistrationToken(token || "");
      if (userId) {
        const user = await User.findById(userId);
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
