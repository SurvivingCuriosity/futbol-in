"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";

interface Busqueda {
  ciudad: string;
  placeId: string;
}

export const UltimasBusquedasLS = () => {
  const [ultimasBusquedas, setUltimasBusquedas] = useState<Busqueda[]>([]);

  useEffect(() => {
    // Este código se ejecuta SOLO en el cliente
    const storedBusquedas = LStorage.getItem(LStorageKeys.ULTIMAS_UBICACIONES) as Busqueda[] | null;
    if (storedBusquedas) {
      setUltimasBusquedas(storedBusquedas);
    }
  }, []);

  return (
    <>
      <p className="text-neutral-400 text-lg mt-5">Últimas búsquedas:</p>
      <div className="rounded-lg flex items-center justify-center p-2 px-4 bg-neutral-900">
        {ultimasBusquedas && ultimasBusquedas.length > 0 ? (
          <ul className="flex gap-4 justify-start w-full">
            {ultimasBusquedas.map((e) => (
              <Link
                key={e.placeId}
                href={`/spots/${e.ciudad}/${e.placeId}`}
                className="text-neutral-300 underline underline-offset-2"
              >
                {e.ciudad.charAt(0).toUpperCase() + e.ciudad.slice(1)}
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">Aquí aparecerán los últimas búsquedas</p>
        )}
      </div>
    </>
  );
};
