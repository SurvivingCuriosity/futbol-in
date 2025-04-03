import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ListaTorneos from "./ListaTorneos/ListaTorneos";

export const TorneosPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <GoBackLayout href="/competicion" className="max-w-xl mx-auto">
      {user && puedeCrearTorneos(user) && <Link href={'/competicion/torneos/nuevo'} className="bg-neutral-800 border border-neutral-600 text-neutral-400 p-2 rounded-lg px-4 mx-auto block w-full text-center">Crear una competición</Link>}
      <h1 className="text-2xl font-extrabold text-primary mb-2">Torneos cerca de ti</h1>
      <ListaTorneos />
    </GoBackLayout>
  );
};
