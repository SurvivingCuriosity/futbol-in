import { NavLayout } from "@/components/NavLayout/NavLayout";
import RankingPage from "@/features/Ranking/RankingPage";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <RankingPage />
    </NavLayout>
  );
}
