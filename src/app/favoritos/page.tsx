import { NavLayout } from "@/components/NavLayout/NavLayout";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <p>Favoritos</p>
    </NavLayout>
  );
}
