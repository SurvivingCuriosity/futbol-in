import connectDb from "@/shared/lib/db";
import TarjetaUsuarioRanking from "./TarjetaUsuarioRanking";
import { User } from "@/shared/models/User/User.model";

export default async function RankingPage() {
  await connectDb();

  const users = await User.find({}).lean();

  const serializedUsers = users.map((user) => ({
    ...user,
    _id: user._id?.toString(),
  }));

  return (
    <ul className="w-full space-y-2">
      {serializedUsers.map((user) => (
        <TarjetaUsuarioRanking user={user} key={user._id} />
      ))}
    </ul>
  );
}
