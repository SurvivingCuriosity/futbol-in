import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export interface ListaSpotsProps {
  futbolines: SpotDTO[];
  selectedLugar: SpotDTO | null;
  onSelect: (lugar: SpotDTO|null) => void;
  nombreCiudad: string;
}

const ListaSpots = (props: ListaSpotsProps) => {
  const { futbolines, selectedLugar, onSelect } = props;

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
          />
        ))}
      </ul>
    </>
  );
};

export default ListaSpots;
