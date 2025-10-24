"use client";

import {
  CurrentOpening,
  TarjetaLugar,
} from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { SpotDTO } from "futbol-in-core/types";
import { OperadorDTO } from "futbol-in-core/types";

export interface ListaSpotsProps {
  futbolines: SpotDTO[];
  selectedLugar: SpotDTO | null;
  onSelect: (lugar: SpotDTO | null) => void;
  userCoords: number[] | null;
  operadores: OperadorDTO[];
  googleInfoSpots: Array<google.maps.places.PlaceResult & CurrentOpening>;
}

const ListaSpots = (props: ListaSpotsProps) => {
  const {
    futbolines,
    selectedLugar,
    onSelect,
    userCoords,
    operadores,
    googleInfoSpots,
  } = props;

  const user = useGetLoggedInUserClient();

  const operadorUser = operadores.find((o) => o.id === user?.idOperador);

  const puedeReclamarloComoOperador = (f: SpotDTO): boolean => {
    if (!operadorUser) return false;

    const yaLoGestiona = f.idOperador === operadorUser.id;

    if (yaLoGestiona) return false;

    const trabajaElTipoDeFutbolin = operadorUser.futbolines.includes(
      f.tipoFutbolin
    );
    const provinciaDelOperador = operadorUser.ciudad.split(",")[1].trim();
    const provinciaDelSpot = f.ciudad.split(",")[1].trim();

    return trabajaElTipoDeFutbolin && provinciaDelOperador === provinciaDelSpot;
  };

  return (
    <>
      <ul
        className={`space-y-2 pt-2 md:space-y-4 w-full md:max-w-md h-full overflow-hidden md:overflow-y-scroll mx-auto pr-2`}
      >
        {futbolines.map((f, index) => (
          <div
            key={f.nombre + index}
            className={index <= 7 ? "animate-fade-in-top" : ""}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TarjetaLugar
              spot={f}
              googleInfo={googleInfoSpots.find(
                (s) => s?.place_id === f?.googlePlaceId
              )}
              selected={f.googlePlaceId === selectedLugar?.googlePlaceId}
              onSelect={onSelect}
              distanciaMessage={
                userCoords ? getDistanciaEntre(userCoords, f.coordinates) : null
              }
              puedeReclamarloComoOperador={puedeReclamarloComoOperador(f)}
              operador={operadores.find((o) => o.id === f.idOperador)}
            />
          </div>
        ))}
      </ul>
    </>
  );
};

export default ListaSpots;

export const getDistanciaEntre = (
  coordenadas1: Array<number | null>,
  coordenadas2: number[]
): string | null => {
  const [lat1, lng1] = coordenadas1;
  const [lat2, lng2] = coordenadas2;

  if (lat1 === null || lng1 === null) {
    return null;
  }

  // Radio de la Tierra en km
  const R = 6371;

  // Convertir grados a radianes

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanciaKm = R * c;

  // Si la distancia es menor a 1km, expresarla en metros
  if (distanciaKm < 1) {
    const metros = Math.round(distanciaKm * 1000);
    return `${metros}m`;
  }

  // Si la distancia es menor a 10km, usar un decimal
  if (distanciaKm < 10) {
    const kmFormateado = distanciaKm.toFixed(1).replace(".", ",");
    return `${kmFormateado}km`;
  }

  // A partir de 10km, redondear sin decimales
  const kmFormateado = Math.round(distanciaKm).toString().replace(".", ",");
  return `${kmFormateado}km`;
};
