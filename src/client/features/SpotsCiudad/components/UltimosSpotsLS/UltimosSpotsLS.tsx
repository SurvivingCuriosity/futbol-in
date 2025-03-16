"use client";

import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import React from "react";

export const UltimosSpotsLS = () => {
  const ultimosSpotsVistos = LStorage.getItem(
    LStorageKeys.ULTIMOS_SPOTS_VISTOS
  ) as SpotDTO[];

  return (
    <>
      <p className="text-neutral-400 text-lg mt-5">Últimos spots vistos:</p>
      <div className="rounded-lg flex items-center justify-center p-4 bg-neutral-900">
        {ultimosSpotsVistos && ultimosSpotsVistos.length > 0 ? (
          <ul className="mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-2">
            {ultimosSpotsVistos?.map((e) =>
              e === null ? null : (
                <TarjetaLugar spot={e} key={e.id} distanciaMessage={null} />
              )
            )}
          </ul>
        ) : (
          <p className="p-10 text-neutral-500">
            Aquí aparecerán los últimos spots vistos
          </p>
        )}
      </div>
    </>
  );
};
