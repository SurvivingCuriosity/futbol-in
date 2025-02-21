import { RegisterForm } from "@/features/Auth/Register/RegisterForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import { User } from "@/shared/models/User/User.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("registrationToken")?.value;    

    if (token) {
      const { userId } = verifyRegistrationToken(token || "");
      const user = await User.findById(userId);
      console.log("User:", user);

      if (user.status === UserStatus.MUST_INIT_ACCOUNT) {
        return redirect("/register/init-account");
      }

      if (user.status === UserStatus.MUST_CONFIRM_EMAIL) {
        return redirect("/register/confirm-email");
      }
    }
  } catch (error: unknown) {
    console.error(error);
  }

  return <RegisterForm />;
};

export default RegisterPage;
