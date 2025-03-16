"use client";

import React, { useEffect, useState } from "react";
import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export const UltimosSpotsLS = () => {
  const [ultimosSpotsVistos, setUltimosSpotsVistos] = useState<SpotDTO[]>([]);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const spots = LStorage.getItem(LStorageKeys.ULTIMOS_SPOTS_VISTOS) as SpotDTO[] | null;
    if (spots) {
      setUltimosSpotsVistos(spots);
    }
  }, []);

  return (
    <>
      <p className="text-neutral-400 text-lg mt-5">Últimos spots vistos:</p>
      <div className="rounded-lg flex items-center justify-center p-4 bg-neutral-900">
        {ultimosSpotsVistos && ultimosSpotsVistos.length > 0 ? (
          <ul className="mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-2">
            {ultimosSpotsVistos.map((spot) =>
              spot === null ? null : (
                <TarjetaLugar
                  spot={spot}
                  key={spot.id}
                  distanciaMessage={null}
                />
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
