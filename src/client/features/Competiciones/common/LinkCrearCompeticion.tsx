import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const LinkCrearCompeticion = async ({tipoCompeticion}:{tipoCompeticion:TipoCompeticion}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const href = tipoCompeticion === TipoCompeticion.TORNEO 
  ? "/competitivo/torneos/crear" 
  : "/competitivo/ligas/crear"

  return (
    user &&
    puedeCrearTorneos(user) && (
      <Link
        href={href}
        className="fixed bottom-16 z-2 lg:bottom-2 right-2 bg-primary border border-stone-800 text-stone-800 p-2 rounded-lg px-4 mx-auto block text-center"
      >
        Crear una competición
      </Link>
    )
  );
};

export default LinkCrearCompeticion;
