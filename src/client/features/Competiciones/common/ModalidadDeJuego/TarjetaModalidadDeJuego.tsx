import { MODALIDADES_JUEGO } from "@/core/constants/Competicion/DescripcionModalidadJuego";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";

export const TarjetaModalidadDeJuego = ({
  modalidadDeJuego,
  selected,
  onSelect,
}: {
  selected: boolean;
  modalidadDeJuego: ModalidadJuego;
  onSelect: (t: ModalidadJuego) => void;
}) => {
  const detalleTipoCompeticion = MODALIDADES_JUEGO[modalidadDeJuego];

  return (
    <div
      onClick={() => onSelect(modalidadDeJuego)}
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
