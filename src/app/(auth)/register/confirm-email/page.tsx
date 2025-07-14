import ConfirmEmailForm from "@/client/features/Auth/Register/ConfirmEmailForm";
import { verifyRegistrationToken } from "@/server/lib/authToken";
import { requireRegistrationStep } from "@/server/lib/registrationGuard";
import { UserService } from "@/server/services/User/UserService";
import { UserStatus } from "futbol-in-core/enum";
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
