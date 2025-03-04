import { TarjetaFutbolinInicio } from "@/shared/components/Inicio/TarjetaFutbolinInicio";
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
        className={`space-y-4 gap-2 items-center w-full md:max-w-sm h-full overflow-y-auto pr-2`}
      >
        {futbolines.length === 0 && (
          <p className="text-center text-neutral-400">
            Ups... parece que aún no hay futbolines en esta ciudad
          </p>
        )}
        {futbolines.map((f, index) => (
          <TarjetaFutbolinInicio
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
