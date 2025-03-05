"use client";

import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { InlinePicker } from "futbol-in-ui";
import { useState } from "react";
import { Mapa } from "../Mapa/Mapa";
import ListaFutbolines from "./ListaFutbolines";
import { TarjetaLugar } from "@/shared/components/TarjetaLugar/TarjetaLugar";

export const FutbolinesCiudadPage = ({
  futbolines,
}: {
  futbolines: LugarDTO[];
}) => {
  const [selectedMarker, setSelectedMarker] = useState<LugarDTO | null>(null);
  // Estado para controlar la vista en pantallas pequeñas: 'list' o 'map'
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <>
      <div className="md:hidden block mb-2 ml-auto">
        <InlinePicker
          options={[
            { id: 1, icon: faList, label: "" },
            { id: 0, icon: faMap, label: "" },
          ]}
          onTabClick={(id) => {
            setSelectedMarker(null);
            setView(id === 0 ? "map" : "list");
          }}
        />
      </div>

      {/* Contenedor principal */}
      <div className="w-full flex flex-col md:flex-row gap-8 h-[calc(100dvh-11em)] md:overflow-hidden overflow-y-auto">
        {/* Lista: se muestra en pantallas pequeñas si view === 'list' y siempre en md y mayores */}
        <div
          className={`${
            view === "map" ? "hidden" : "block"
          } md:block w-full md:w-1/2`}
        >
          <ListaFutbolines
            futbolines={futbolines}
            selectedLugar={selectedMarker}
            onSelect={setSelectedMarker}
          />
        </div>
        {/* Mapa: se muestra en pantallas pequeñas si view === 'map' y siempre en md y mayores */}
        <div
          className={`${
            view === "list" ? "invisible" : "visible"
          } md:visible w-full rounded-xl overflow-hidden h-full relative`}
        >
          <Mapa
            markers={futbolines}
            selectedMarker={selectedMarker}
            onSelectMarker={setSelectedMarker}
          />
          {selectedMarker !== null && (
            <div className="absolute bottom-0.5 z-5 mx-auto backdrop-blur-[2px] w-full p-1 flex items-center justify-center">
              <TarjetaLugar
                lugar={selectedMarker}
                selected={true}
                onSelect={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
