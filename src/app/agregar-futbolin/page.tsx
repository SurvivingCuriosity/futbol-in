import { BottomNavLayout } from "@/components/BottomNavLayout/BottomNavLayout";
import { getServerSession } from "next-auth";
import AgregarFutbolinPage from "./AgregarFutbolinPage";

const page = async () => {
  const session = await getServerSession();

  return (
    <BottomNavLayout loggedIn={!!session}>
      <AgregarFutbolinPage />
    </BottomNavLayout>
  );
};

export default page;
