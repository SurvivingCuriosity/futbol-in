import AgregarSpotPage from "@/features/AgregarSpot/AgregarSpotPage";
import { authOptions } from "@/shared/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/not-allowed");
  }

  return <AgregarSpotPage />;
};

export default Page;
