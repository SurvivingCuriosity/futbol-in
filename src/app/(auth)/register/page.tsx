import { RegisterForm } from "@/features/Auth/Register/RegisterForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import { User } from "@/shared/models/User/User.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("registrationToken")?.value;

  console.log("register: token", token);

  try {
    if (token) {
      const { userId } = verifyRegistrationToken(token || "");
      console.log("register: userId", userId);
      if (userId) {
        const user = await User.findById(userId);
        console.log("register: user", user);
        console.log("register: user.status", user.status);
        if (user) {
          if (user.status === UserStatus.MUST_INIT_ACCOUNT) {
            redirect("/register/init-account");
            return null;
          }

          if (user.status === UserStatus.MUST_CONFIRM_EMAIL) {
            redirect("/register/confirm-email");
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
