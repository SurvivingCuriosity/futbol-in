import ConfirmEmailForm from "@/features/Auth/Register/ConfirmEmailForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { requireRegistrationStep } from "@/shared/lib/registrationGuard";

const ConfirmEmailPage = async () => {  
  await requireRegistrationStep(UserStatus.MUST_CONFIRM_EMAIL);
  return <ConfirmEmailForm />;
};

export default ConfirmEmailPage;
