"use client";

import SearchInputCiudad from "@/client/shared/components/SearchInputCiudad";
import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { InlinePicker } from "futbol-in-ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mapa } from "../Mapa/Mapa";
import { ButtonFiltros, Filtros } from "./components/Filtros/Filtros";
import { PreviewFiltros } from "./components/Filtros/PreviewFiltros";
import ListaSpots, { getDistanciaEntre } from "./ListaSpots";
import { useUserLocation } from "@/client/shared/services/UserLocation/useUserLocation";
import { FullPlace } from "@/app/spots/[ciudad]/[placeId]/page";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";

export interface SpotsCiudadPageProps {
  spots: SpotDTO[];
  place: FullPlace;
}

export const SpotsCiudadPage = (props: SpotsCiudadPageProps) => {
  const { spots, place } = props;

  const userLocation = useUserLocation();

  const currentCoords = userLocation;

  const [spotsFiltrados, setSpotsFiltrados] = useState<SpotDTO[]>(spots);
  const [selectedMarker, setSelectedMarker] = useState<SpotDTO | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [filtros, setFiltros] = useState<Filtros | null>(null);

  useEffect(() => {
    if (filtros === null) {
      setSpotsFiltrados(spots);
    } else {
      const porTipoDeFutbolin =
        filtros.tipoFutbolin === TipoFutbolin.CUALQUIERA
          ? spots
          : spots.filter((f) => f.tipoFutbolin === filtros.tipoFutbolin);

      setSpotsFiltrados(porTipoDeFutbolin);
    }
  }, [filtros, spots]);

  const handleSelectSpot = (spot: SpotDTO | null) => {
    setSelectedMarker(spot);

    if (!spot) return;

    let ultimosSpotsVistos =
      (LStorage.getItem(LStorageKeys.ULTIMOS_SPOTS_VISTOS) as SpotDTO[]) || [];

    ultimosSpotsVistos = ultimosSpotsVistos.filter(
      (s) => s.googlePlaceId !== spot.googlePlaceId
    );

    ultimosSpotsVistos.unshift(spot);

    if (ultimosSpotsVistos.length > 3) {
      ultimosSpotsVistos.pop();
    }

    LStorage.setItem(LStorageKeys.ULTIMOS_SPOTS_VISTOS, ultimosSpotsVistos);
  };

  if (spotsFiltrados.length === 0) {
    return (
      <div className="p-10 max-w-md mx-auto flex flex-col items-stretch h-full">
        <p className="text-center text-neutral-400 mb-8 text-2xl">
          Ups... parece que aún no hay futbolines en esta ciudad
        </p>
        <Link
          className="bg-primary text-neutral-900 px-4 p-2 text-lg rounded-2xl w-fit mx-auto"
          href="/agregar-spot"
        >
          {`Añade el primero`}
        </Link>
        <hr className="my-8 text-neutral-800" />
        <p className="text-center text-neutral-400 mb-8">
          o busca en otra ciudad...
        </p>
        <SearchInputCiudad />
      </div>
    );
  }

  return (
    <>
      {spotsFiltrados.length > 0 && (
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
              size="sm"
            />
          </div>
        </header>
      )}

      {/* Contenedor principal */}
      <div className="w-full flex flex-col md:flex-row gap-4 h-[calc(100dvh-13em)] md:h-[calc(100dvh-15em)] md:overflow-hidden overflow-y-auto">
        {/* Lista: se muestra en pantallas pequeñas si view === 'list' y siempre en md y mayores */}
        <div
          className={`${
            view === "map" ? "hidden" : "block"
          } md:block w-full md:w-1/2`}
        >
          <ListaSpots
            futbolines={spotsFiltrados}
            selectedLugar={selectedMarker}
            onSelect={handleSelectSpot}
            userCoords={
              currentCoords ? [currentCoords.lng, currentCoords.lat] : null
            }
          />
        </div>
        {/* Mapa: se muestra en pantallas pequeñas si view === 'map' y siempre en md y mayores */}
        <div
          className={`${
            view === "list" ? "invisible" : "visible"
          } md:visible w-full rounded-xl overflow-hidden mt-2 h-[99%] relative`}
        >
          <Mapa
            markers={spotsFiltrados}
            selectedMarker={selectedMarker}
            onSelectMarker={handleSelectSpot}
            userLocation={currentCoords}
            initialCenter={place.coords}
          />
          {selectedMarker !== null && (
            <div className="absolute bottom-2 z-5 mx-auto backdrop-blur-[2px] w-full p-1 flex items-center justify-center">
              <TarjetaLugar
                spot={selectedMarker}
                selected={true}
                onSelect={() => {}}
                distanciaMessage={
                  currentCoords
                    ? getDistanciaEntre(
                        [currentCoords.lng, currentCoords.lat],
                        selectedMarker.coordinates
                      )
                    : null
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
