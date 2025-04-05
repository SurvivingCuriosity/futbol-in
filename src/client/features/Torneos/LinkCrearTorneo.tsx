import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const LinkCrearTorneo = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    user &&
    puedeCrearTorneos(user) && (
      <Link
        href={"/competitivo/torneos/nuevo"}
        className="fixed bottom-16 z-2 lg:bottom-2 right-2 bg-primary border border-stone-800 text-stone-800 p-2 rounded-lg px-4 mx-auto block text-center"
      >
        Crear una competición
      </Link>
    )
  );
};

export default LinkCrearTorneo;
