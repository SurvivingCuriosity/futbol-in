import { TIPOS_COMPETICION } from "@/core/constants/Competicion/DescripcionCompeticion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";

export const TarjetaTipoCompeticion = ({
  tipoCompeticion,
  selected,
  onSelect,
}: {
  selected: boolean;
  tipoCompeticion: TipoCompeticion;
  onSelect: (t: TipoCompeticion) => void;
}) => {
  const detalleTipoCompeticion = TIPOS_COMPETICION[tipoCompeticion];

  return (
    <div
      onClick={() => onSelect(tipoCompeticion)}
      className={`p-2 border rounded-lg border-neutral-700 flex flex-col ${
        selected ? "bg-neutral-900 border-primary text-primary" : ""
      }`}
    >
      <p className="text-lg font-bold">{detalleTipoCompeticion.titulo}</p>
      <ul className="list-disc list-inside space-y-1">
        {detalleTipoCompeticion.descripcion.map((descripcion, index) => (
          <li
            key={index}
            className={`text-xs  ml-4 ${
              selected ? "text-primary/60" : "text-neutral-500"
            }`}
          >
            {descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};
