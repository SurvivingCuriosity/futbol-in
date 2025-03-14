import { UserService } from "@/server/services/User/UserService";
import TarjetaUsuarioRanking from "./TarjetaUsuarioRanking";

export default async function RankingPage() {

  const users = await UserService.getAll();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-black text-primary">Ranking</h1>
      <ul className="w-full space-y-2 mt-2">
        {users.map((user) => (
          <TarjetaUsuarioRanking user={user} key={user.id} />
        ))}
      </ul>
    </div>
  );
}
