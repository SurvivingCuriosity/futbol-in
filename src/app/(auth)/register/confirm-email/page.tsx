import ConfirmEmailForm from "@/features/Auth/Register/ConfirmEmailForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import { requireRegistrationStep } from "@/shared/lib/registrationGuard";
import { UserService } from "@/shared/services/User/UserService";
import { cookies } from "next/headers";

const ConfirmEmailPage = async () => {
  await requireRegistrationStep(UserStatus.MUST_CONFIRM_EMAIL);
  const cookiesStore = await cookies();
  const token = cookiesStore.get("registrationToken")?.value;
  const { userId } = verifyRegistrationToken(token || "");
  const user = await UserService.findById(userId);
  return <ConfirmEmailForm email={user?.email ?? 'null'} />;
};

export default ConfirmEmailPage;
