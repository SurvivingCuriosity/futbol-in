import generico from "@/shared/assets/img/generico.webp";
import genericomadera from "@/shared/assets/img/genericomadera.jpg";
import infinty from "@/shared/assets/img/infinity.jpg";
import presas from "@/shared/assets/img/presas.jpg";
import presasevo from "@/shared/assets/img/presasevo.jpg";
import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";

import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import Image, { StaticImageData } from "next/image";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonesLikeDislike } from "./components/BotonesLikeDislike";
import { Comentarios } from "./components/Comentarios";
import { IndicadorCobertura } from "./components/IndicadorCobertura";
import { MainInfo } from "./components/MainInfo";
import { MensajeUltimaValoracion } from "./components/MensajeUltimaValoracion";
import { MarcaVerificado } from "./components/MarcaVerificado";

export interface TarjetaLugarProps {
  lugar: LugarDTO;
  selected: boolean;
  onSelect: (l: LugarDTO) => void;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
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
          ? "border-neutral-700 md:border-primary h-72 bg-neutral-700/20"
          : "border-neutral-800 h-24"
      } border w-full z-2 flex flex-col gap-2 p-2 rounded-lg min-w-[200px] overflow-invisible`}
    >
      {Math.random() > 0.5 ? <MarcaVerificado /> : <IndicadorCobertura />}

      <MainInfo lugar={lugar} />

      <div
        className={`flex flex-col justify-between w-full h-full ${
          selected ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <BotoneraCompartir />
        <Comentarios />
        <MensajeUltimaValoracion />
        <BotonesLikeDislike />
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
