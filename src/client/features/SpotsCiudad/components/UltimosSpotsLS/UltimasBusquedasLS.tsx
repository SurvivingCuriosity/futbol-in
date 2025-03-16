"use client";

import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import Link from "next/link";

export const UltimasBusquedasLS = () => {
  const ultimasBusquedas = LStorage.getItem(
    LStorageKeys.ULTIMAS_UBICACIONES
  ) as {ciudad:string, placeId:string}[];

  console.log(ultimasBusquedas)

  return (
    <>
      <p className="text-neutral-400 text-lg mt-5">Últimas búsquedas:</p>
      <div className="rounded-lg flex items-center justify-center p-2 px-4 bg-neutral-900">
        {ultimasBusquedas && ultimasBusquedas.length > 0 ? (
          <ul className="flex gap-4 justify-start w-full">
            {ultimasBusquedas?.map((e) =>
              <Link href={`/spots/${e.ciudad}/${e.placeId}`} key={e.placeId} className="text-neutral-300 underline underline-offset-2">{e.ciudad.charAt(0).toUpperCase() + e.ciudad.slice(1)}</Link>
            )}
          </ul>
        ) : (
          <p className="text-neutral-500">Aquí aparecerán los últimas búsquedas</p>
        )}
      </div>
    </>
  );
};
