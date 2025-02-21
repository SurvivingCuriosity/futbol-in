import InitAccountForm from "@/features/Auth/Register/InitAccountForm";
import { UserStatus } from "@/shared/enum/User/Status";
import { requireRegistrationStep } from "@/shared/lib/registrationGuard";

const InitAccountPage = async () => {
  await requireRegistrationStep(UserStatus.MUST_INIT_ACCOUNT);
  return <InitAccountForm />;
};

export default InitAccountPage;
