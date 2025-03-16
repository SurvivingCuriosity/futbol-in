import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export interface ListaSpotsProps {
  futbolines: SpotDTO[];
  selectedLugar: SpotDTO | null;
  onSelect: (lugar: SpotDTO | null) => void;
  userCoords: number[] | null;
}

const ListaSpots = (props: ListaSpotsProps) => {
  const { futbolines, selectedLugar, onSelect, userCoords } = props;

  return (
    <>
      <ul
        className={`space-y-2 pt-2 md:space-y-4 w-full md:max-w-md h-full overflow-hidden md:overflow-y-scroll mx-auto pr-2`}
      >
        {futbolines.map((f, index) => (
          <TarjetaLugar
            key={f.nombre + index}
            spot={f}
            selected={f.googlePlaceId === selectedLugar?.googlePlaceId}
            onSelect={onSelect}
            distanciaMessage={
              userCoords ? getDistanciaEntre(userCoords, f.coordinates) : null
            }
          />
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
    console.log("lat1 o lng1 es null");
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
