import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export interface ListaSpotsProps {
  futbolines: SpotDTO[];
  selectedLugar: SpotDTO | null;
  onSelect: (lugar: SpotDTO) => void;
  nombreCiudad: string;
}

const ListaSpots = (props: ListaSpotsProps) => {
  const { futbolines, selectedLugar, onSelect } = props;

  return (
    <>
      <ul
        className={`space-y-4 pt-2 md:space-y-8 w-full md:max-w-md h-full overflow-hidden md:overflow-y-scroll mx-auto`}
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
