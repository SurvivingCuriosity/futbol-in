import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";
import presas from "@/shared/assets/img/presas.jpg";
import presasevo from "@/shared/assets/img/presasevo.jpg";
import generico from "@/shared/assets/img/generico.webp";
import genericomadera from "@/shared/assets/img/genericomadera.jpg";
import infinty from "@/shared/assets/img/infinity.jpg";

import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { ILugar } from "@/shared/models/Futbolin.model";
import { faFutbol, faLocationDot, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";

export const TarjetaFutbolinInicio = ({ lugar }: { lugar: ILugar }) => {

  const imageMap:Record<TipoFutbolin, StaticImageData> = {
    [TipoFutbolin.TSUNAMI]: tsunami_zoom,
    [TipoFutbolin.PRESAS]: presas,
    [TipoFutbolin.PRESAS_EVO]: presasevo,
    [TipoFutbolin.GENERICO]: generico,
    [TipoFutbolin.GENÉRICO_MADERA]: genericomadera,
    [TipoFutbolin.INFINITY]: infinty,
  }

  return (
    <div className="relative flex items-center rounded overflow-hidden snap-center bg-neutral-800 p-2 min-w-[300px] w-full">
      <div className="absolute left-2 z-2 flex flex-col gap-2 bg-neutral-950/95 p-2 rounded-lg w-4/12 min-w-[200px]">
        
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

      <Image
        width={200}
        height={200}
        alt="Imagen futbolin"
        src={imageMap[lugar.tipoFutbolin]}
        className="z-1 scale-110 w-8/12 ml-auto"
      />
    </div>
  );
};
