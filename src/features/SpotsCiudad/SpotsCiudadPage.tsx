"use client";

import { TarjetaLugar } from "@/shared/components/TarjetaLugar/TarjetaLugar";
import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { SpotDTO } from "@/shared/models/Spot/SpotDTO";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { InlinePicker } from "futbol-in-ui";
import { useEffect, useState } from "react";
import { Mapa } from "../Mapa/Mapa";
import { ButtonFiltros, Filtros } from "./components/Filtros/Filtros";
import { PreviewFiltros } from "./components/Filtros/PreviewFiltros";
import ListaFutbolines from "./ListaSpots";

export const SpotsCiudadPage = ({ futbolines }: { futbolines: SpotDTO[] }) => {
  const [futbolinesFiltrados, setFutbolinesFiltrados] =
    useState<SpotDTO[]>(futbolines);

  const [selectedMarker, setSelectedMarker] = useState<SpotDTO | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [filtros, setFiltros] = useState<Filtros | null>(null);

  useEffect(() => {
    if (filtros === null) {
      setFutbolinesFiltrados(futbolines);
    } else {
      const porTipoDeFutbolin =
        filtros.tipoFutbolin === TipoFutbolin.CUALQUIERA
          ? futbolines
          : futbolines.filter((f) => f.tipoFutbolin === filtros.tipoFutbolin);

      setFutbolinesFiltrados(porTipoDeFutbolin);
    }
  }, [filtros, futbolines]);

  return (
    <>
      <header className="flex justify-start items-center w-full">
        <ButtonFiltros onFiltrosChange={setFiltros} filtros={filtros} />
        <PreviewFiltros filtros={filtros} onFiltrosChange={setFiltros} />
        <div className="md:hidden block ml-auto">
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
      </header>

      {/* Contenedor principal */}
      <div className="w-full flex flex-col md:flex-row gap-8 h-[calc(100dvh-11em)] md:overflow-hidden overflow-y-auto">
        {/* Lista: se muestra en pantallas pequeñas si view === 'list' y siempre en md y mayores */}
        <div
          className={`${
            view === "map" ? "hidden" : "block"
          } md:block w-full md:w-1/2`}
        >
          <ListaFutbolines
            futbolines={futbolinesFiltrados}
            selectedLugar={selectedMarker}
            onSelect={setSelectedMarker}
          />
        </div>
        {/* Mapa: se muestra en pantallas pequeñas si view === 'map' y siempre en md y mayores */}
        <div
          className={`${
            view === "list" ? "invisible" : "visible"
          } md:visible w-full rounded-xl overflow-hidden mt-2 h-full relative`}
        >
          <Mapa
            markers={futbolinesFiltrados}
            selectedMarker={selectedMarker}
            onSelectMarker={setSelectedMarker}
          />
          {selectedMarker !== null && (
            <div className="absolute bottom-0.5 z-5 mx-auto backdrop-blur-[2px] w-full p-1 flex items-center justify-center">
              <TarjetaLugar
                spot={selectedMarker}
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
