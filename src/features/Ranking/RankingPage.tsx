import { UserService } from "@/shared/services/User/UserService";
import Link from "next/link";
import TarjetaUsuarioRanking from "./TarjetaUsuarioRanking";

export default async function RankingPage() {

  const users = await UserService.getAll();

  return (
    <div className="w-full">
      <Link href="/logros" className="text-primary underline underline-offset-2">Logros disponibles</Link>
      <ul className="w-full space-y-2 mt-2">
        {users.map((user) => (
          <TarjetaUsuarioRanking user={user} key={user.id} />
        ))}
      </ul>
    </div>
  );
}
