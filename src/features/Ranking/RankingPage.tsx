import { UserStatus } from "@/shared/enum/User/Status";
import connectDb from "@/shared/lib/db";
import { User } from "@/shared/models/User/User.model";
import { UserDTO } from "@/shared/models/User/UserDTO";
import TarjetaUsuarioRanking from "./TarjetaUsuarioRanking";

export default async function RankingPage() {
  await connectDb();

  const users = await User.find({}).lean();

  const serializedUsers = (users as unknown as Array<UserDTO&{_id: string}>)
    .map((user) => ({
      ...user,
      id: user._id?.toString(),
    }))
    .filter((user) => user.status === UserStatus.DONE);

  return (
    <ul className="w-full space-y-2">
      {serializedUsers.map((user) => (
        <TarjetaUsuarioRanking user={user} key={user.id} />
      ))}
    </ul>
  );
}
