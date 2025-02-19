import { NavLayout } from "@/components/NavLayout/NavLayout";
import { getServerSession } from "next-auth";
import AgregarFutbolinPage from "./AgregarFutbolinPage";

const page = async () => {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <AgregarFutbolinPage />
    </NavLayout>
  );
};

export default page;
