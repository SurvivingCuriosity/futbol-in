"use client";
import { SpotDTO } from "futbol-in-core/types";
import { Mapa } from "../../Mapa/Mapa";
import { spainCenter } from "../../Mapa/MapaGlobalPage";

export function MapaLanding({ markers }: { markers: SpotDTO[] }) {
  return (
    <Mapa
      markers={markers}
      initialCenter={spainCenter}
      onSelectMarker={() => {}}
      selectedMarker={null}
      userLocation={null}
      zoom={5.5}
      restrictToSpain={false}
      focusCoords={null}
    />
  );
}
