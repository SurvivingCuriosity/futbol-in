import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const TorneosPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <GoBackLayout href="/competicion">
      <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center">
        <p className="text-lg">Ups... esta parte aún no está terminada</p>
        <p className="text-xs text-neutral-500">
          Podrás apuntarte a torneos, ver tus resultados y los de otros
          jugadores
        </p>
      </div>
      {user && puedeCrearTorneos(user) && <Link href={'/competicion/torneos/nuevo'} className="bg-neutral-800 text-neutral-400 p-2 rounded-lg px-4 mx-auto block w-fit">Crear una competición</Link>}
    </GoBackLayout>
  );
};
