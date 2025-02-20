import connectDb from "@/shared/lib/db";
import User from "@/shared/models/User.model";
import TarjetaUsuarioRanking from "./TarjetaUsuarioRanking";

export default async function RankingPage() {
  await connectDb();

  const users = await User.find({}).lean();

  // Convertir `_id` en string para que Next.js pueda serializarlo
  const serializedUsers = users.map((user) => ({
    ...user,
    // @ts-expect-error qwe
    _id: user._id.toString(),
  }));

  return (
    <ul className="w-full space-y-2">
      {serializedUsers.map((user) => (
        <TarjetaUsuarioRanking user={user} key={user._id} />
      ))}
    </ul>
  );
}
