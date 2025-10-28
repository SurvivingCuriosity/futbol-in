"use client";

import { SpotDTO } from "futbol-in-core/types";
import React, { useState } from "react";
import { Mapa } from "./Mapa";
import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { useSearchParams } from "next/navigation";

export const spainCenter = { lat: 40.416775, lng: -3.70379 };

export const MapaGlobalPage = ({ spots }: { spots: SpotDTO[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<SpotDTO | null>(null);

  const params = useSearchParams();
  const from = params.get("from");

  return (
    <GoBackLayout href={from ?? "/"}>
      <h1 className="text-2xl font-bold text-primary">Futbolines en España</h1>
      <div
        className={`w-full rounded-xl overflow-hidden mt-2 relative h-[calc(100dvh-11em)] md:h-[calc(100dvh-15em)]`}
      >
        <Mapa
          markers={spots}
          selectedMarker={selectedMarker}
          onSelectMarker={setSelectedMarker}
          userLocation={null}
          initialCenter={spainCenter}
          zoom={5.4}
          restrictToSpain={true}
        />
        {selectedMarker !== null && (
          <div className="absolute bottom-2 z-5 mx-auto shadow w-full p-1 flex items-center justify-center">
            <TarjetaLugar
              googleInfo={undefined}
              spot={selectedMarker}
              selected={true}
              onSelect={() => {}}
              distanciaMessage={null}
            />
          </div>
        )}
      </div>
    </GoBackLayout>
  );
};
