import generico from "@/shared/assets/img/generico.webp";
import genericomadera from "@/shared/assets/img/genericomadera.jpg";
import infinty from "@/shared/assets/img/infinity.jpg";
import presas from "@/shared/assets/img/presas.jpg";
import presasevo from "@/shared/assets/img/presasevo.jpg";
import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";

import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import {
  faFutbol,
  faLocationDot,
  faMapLocationDot,
  faSadTear,
  faShare,
  faSignal,
  faStore,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";

export interface TarjetaFutbolinInicioProps {
  lugar: LugarDTO;
  selected: boolean;
  onSelect: (l: LugarDTO) => void;
}

export const TarjetaFutbolinInicio = (props: TarjetaFutbolinInicioProps) => {
  const { lugar, selected, onSelect } = props;

  const imageMap: Record<TipoFutbolin, StaticImageData> = {
    [TipoFutbolin.TSUNAMI]: tsunami_zoom,
    [TipoFutbolin.PRESAS]: presas,
    [TipoFutbolin.PRESAS_EVO]: presasevo,
    [TipoFutbolin.GENERICO]: generico,
    [TipoFutbolin.GENÉRICO_MADERA]: genericomadera,
    [TipoFutbolin.INFINITY]: infinty,
  };

  return (
    <div
      onClick={() => onSelect(lugar)}
      className={`bg-neutral-950/95 relative transition-all duration-300 *:select-none overflow-hidden ${
        selected
          ? "border-primary h-72 bg-neutral-700/20"
          : "border-neutral-800 h-24 bg-neutral-950/95"
      } border w-full left-2 z-2 flex flex-col gap-2  p-2 rounded-lg min-w-[200px]`}
    >
      <div className="absolute top-0.5 right-0.5 z-3 bg-black rounded text-xs flex gap-1 items-center text-green-300 p-1">
        <p>23</p>
        <FontAwesomeIcon icon={faSignal} />
      </div>

      <div className="bg-neutral-950/90 w-fit p-2 z-2 rounded-lg">
        <div className="flex items-baseline gap-1 text-primary">
          <FontAwesomeIcon className="w-4" icon={faFutbol} />
          <p className="text-lg font-bold">{lugar.tipoFutbolin}</p>
        </div>

        <div className="flex items-center gap-1 text-neutral-400 text-sm">
          <FontAwesomeIcon className="w-4" icon={faStore} />
          <p className="">{lugar.nombre}</p>
        </div>
        <div className="flex items-center gap-1 text-neutral-400 text-sm">
          <FontAwesomeIcon className="w-4" icon={faLocationDot} />
          <p className="">{lugar.direccion}</p>
        </div>
      </div>

      <div
        className={`flex flex-col justify-between w-full h-full ${
          selected ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="flex items-center gap-2 text-sm mb-4">
          <button className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900">
            <FontAwesomeIcon icon={faShare} />
          </button>

          <button className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900">
            <FontAwesomeIcon icon={faMapLocationDot} />
          </button>
        </div>

        <p className="bg-neutral-800 p-1 rounded-lg text-sm text-neutral-500 mb-auto">
          Comentarios en plan este futbolin esta super chulo
        </p>

        <p className="py-1 text-neutral-500 text-sm">Última valoración <span className="text-green-600">positiva</span> ayer</p> 

        <div className="flex items-center gap-2 text-sm">
          <button className="cursor-pointer border w-full rounded-lg p-2 hover:bg-green-500/30 bg-green-500/10 border-green-500 text-green-500">
            <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
            Está ahí (32)
          </button>
          <button className="cursor-pointer border w-full rounded-lg p-2 hover:bg-red-500/30 bg-red-500/10 border-red-500 text-red-500">
            <FontAwesomeIcon icon={faSadTear} className="mr-2" />
            Ya no está (2)
          </button>
        </div>
      </div>
      <Image
        width={200}
        height={200}
        alt="Imagen futbolin"
        src={imageMap[lugar.tipoFutbolin]}
        className="z-1 absolute right-0 top-0 h-24 w-auto"
      />
    </div>
  );
};
