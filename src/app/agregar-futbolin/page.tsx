import { NavLayout } from "@/shared/components/Layouts/NavLayout";
import AgregarFutbolinPage from "@/features/AgregarFutbolin/AgregarFutbolinPage";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <AgregarFutbolinPage />
    </NavLayout>
  );
};

export default page;
