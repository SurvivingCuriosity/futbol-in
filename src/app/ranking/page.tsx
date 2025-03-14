import RankingPage from "@/client/features/Ranking/RankingPage";

export const revalidate = 60

export default async function page() {
  return <RankingPage />;
}
