import { TarjetaLugar } from "@/shared/components/TarjetaLugar/TarjetaLugar";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";

export interface ListaFutbolinesProps {
  futbolines: LugarDTO[];
  selectedLugar: LugarDTO | null;
  onSelect: (lugar: LugarDTO) => void;
}

const ListaFutbolines = (props: ListaFutbolinesProps) => {
  const { futbolines, selectedLugar, onSelect } = props;

  return (
    <>
      <ul
        className={`space-y-4 md:space-y-8 w-full md:max-w-md h-full overflow-hidden md:overflow-y-scroll pr-2`}
      >
        {futbolines.length === 0 && (
          <p className="text-center text-neutral-400">
            Ups... parece que aún no hay futbolines en esta ciudad
          </p>
        )}
        {futbolines.map((f, index) => (
          <TarjetaLugar
            key={f.nombre + index}
            lugar={f}
            selected={f.googlePlaceId === selectedLugar?.googlePlaceId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </>
  );
};

export default ListaFutbolines;
