import { TarjetaLugar } from "@/shared/components/TarjetaLugar/TarjetaLugar";
import { SpotDTO } from "@/shared/models/Spot/SpotDTO";

export interface ListaSpotsProps {
  futbolines: SpotDTO[];
  selectedLugar: SpotDTO | null;
  onSelect: (lugar: SpotDTO) => void;
}

const ListaSpots = (props: ListaSpotsProps) => {
  const { futbolines, selectedLugar, onSelect } = props;

  return (
    <>
      <ul
        className={`space-y-4 pt-2 md:space-y-8 w-full md:max-w-md h-full overflow-hidden md:overflow-y-scroll pr-2`}
      >
        {futbolines.length === 0 && (
          <p className="text-center text-neutral-400">
            Ups... parece que aún no hay futbolines en esta ciudad
          </p>
        )}
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
