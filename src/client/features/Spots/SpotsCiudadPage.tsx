"use client";

import {
  CurrentOpening,
  TarjetaLugar,
} from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { useUserLocation } from "@/client/shared/services/UserLocation/useUserLocation";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { ICoords } from "@/core/types/Spot/Coords";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { faList, faMap } from "@fortawesome/free-solid-svg-icons";
import { InlinePicker } from "futbol-in-ui";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Mapa } from "../Mapa/Mapa";
import { ButtonFiltros, Filtros } from "./components/Filtros/Filtros";
import { PreviewFiltros } from "./components/Filtros/PreviewFiltros";
import ListaSpots, { getDistanciaEntre } from "./ListaSpots";

export interface SpotsCiudadPageProps {
  spots: SpotDTO[];
  coords: ICoords;
  ciudad: string;
  operadores: OperadorDTO[];
  googleInfoSpots: Array<google.maps.places.PlaceResult & CurrentOpening>;
}

export const SpotsCiudadPage = (props: SpotsCiudadPageProps) => {
  const { spots, coords, ciudad, operadores, googleInfoSpots } = props;

  const userLocation = useUserLocation();

  const currentCoords = userLocation;

  const [selectedMarker, setSelectedMarker] = useState<SpotDTO | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [filtros, setFiltros] = useState<Filtros | null>(null);

  /** Devuelve `true` si el spot pasa TODOS los filtros. */
  function cumpleFiltros(
    spot: SpotDTO,
    filtros: Filtros | null,
    abiertos: Set<string> // place_id abiertos “ahora”
  ): boolean {
    if (!filtros) return true; // sin filtros → todos pasan

    // 1. Tipo de futbolín
    if (
      filtros.tipoFutbolin !== TipoFutbolin.CUALQUIERA &&
      spot.tipoFutbolin !== filtros.tipoFutbolin
    )
      return false;

    // 2. Verificado
    if (filtros.soloVerificados && !spot.verificado) return false;

    // 3. Bar abierto
    if (filtros.soloBaresAbiertos && !abiertos.has(spot.googlePlaceId))
      return false;

    return true;
  }

  const abiertosAhora = useMemo(() => {
    return new Set(
      googleInfoSpots
        .filter((s) => s?.current_opening_hours?.open_now === true)
        .map((s) => s.place_id)
    );
  }, [googleInfoSpots]);

  const spotsFiltrados = useMemo(
    () =>
      spots.filter((s) =>
        cumpleFiltros(s, filtros, abiertosAhora as Set<string>)
      ),
    [spots, filtros, abiertosAhora]
  );

  const handleSelectSpot = useCallback(
    (spot: SpotDTO | null) => {
      console.log("handleSelectSpot", spot);
      setSelectedMarker(spot);
    },
    []
  );

  if (spots.length === 0) {
    return (
      <div className="p-10 max-w-md mx-auto flex flex-col items-stretch h-full">
        <p className="text-center text-neutral-400 mb-8 text-2xl">
          Ups... parece que aún no hay futbolines en esta ciudad
        </p>
        <Link
          className="bg-primary text-neutral-900 px-4 p-2 text-lg rounded-2xl w-fit mx-auto"
          href={`/agregar-spot?ciudad=${ciudad}`}
        >
          {`Añade el primero`}
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="flex justify-start items-center w-full mt-2">
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

      {spotsFiltrados.length === 0 && (
        <p className="text-neutral-500 p-5">Ups... no hay resultados</p>
      )}

      <div className="w-full flex flex-col md:flex-row gap-4 h-[calc(100dvh-14em)] md:h-[calc(100dvh-15em)] md:overflow-hidden overflow-y-auto">
        <div
          className={`${
            view === "map" ? "hidden" : "block"
          } md:block w-full md:w-1/2`}
        >
          <ListaSpots
            futbolines={spotsFiltrados}
            googleInfoSpots={googleInfoSpots}
            selectedLugar={selectedMarker}
            onSelect={handleSelectSpot}
            operadores={operadores}
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
            onSelectMarker={(spot)=>{
              handleSelectSpot(spot)
            }}
            userLocation={currentCoords}
            initialCenter={coords}
          />
          {selectedMarker !== null && (
            <div className="absolute bottom-2 z-5 mx-auto shadow w-full p-1 flex items-center justify-center">
              <TarjetaLugar
                googleInfo={googleInfoSpots.find(
                  (s) => s.place_id === selectedMarker.googlePlaceId
                )}
                spot={selectedMarker}
                selected={true}
                onSelect={() => {}}
                operador={operadores.find(
                  (o) => o.id === selectedMarker.idOperador
                )}
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
