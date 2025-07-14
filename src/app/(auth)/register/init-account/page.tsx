import InitAccountForm from "@/client/features/Auth/Register/InitAccountForm";
import { UserStatus } from "futbol-in-core/enum";
import { requireRegistrationStep } from "@/server/lib/registrationGuard";

const InitAccountPage = async () => {
  await requireRegistrationStep(UserStatus.MUST_INIT_ACCOUNT);
  
  return <InitAccountForm />;
};

export default InitAccountPage;
