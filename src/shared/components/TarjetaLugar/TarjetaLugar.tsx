import generico from "@/shared/assets/img/generico.webp";
import genericomadera from "@/shared/assets/img/genericomadera.jpg";
import infinty from "@/shared/assets/img/infinity.jpg";
import presas from "@/shared/assets/img/presas.jpg";
import presasevo from "@/shared/assets/img/presasevo.jpg";
import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";

import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { SpotDTO } from "@/shared/models/Spot/SpotDTO";
import Image, { StaticImageData } from "next/image";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonesLikeDislike } from "./components/BotonesLikeDislike";
import { Comentarios } from "./components/Comentarios";
import { IndicadorCobertura } from "./components/IndicadorCobertura";
import { MainInfo } from "./components/MainInfo";
import { MarcaVerificado } from "./components/MarcaVerificado";
import { useState } from "react";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO) => void;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const { spot:spotProp, selected, onSelect } = props;

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  const onChangeSpotCallback = (newSpot: SpotDTO) => {
    setSpot(newSpot);
  };

  const imageMap: Record<Exclude<TipoFutbolin, TipoFutbolin.CUALQUIERA>, StaticImageData> = {
    [TipoFutbolin.TSUNAMI]: tsunami_zoom,
    [TipoFutbolin.PRESAS]: presas,
    [TipoFutbolin.PRESAS_EVO]: presasevo,
    [TipoFutbolin.GENERICO]: generico,
    [TipoFutbolin.GENÉRICO_MADERA]: genericomadera,
    [TipoFutbolin.INFINITY]: infinty,
  };

  const imagen = imageMap[spot.tipoFutbolin as Exclude<TipoFutbolin, TipoFutbolin.CUALQUIERA>];
  
  return (
    <div
      onClick={() => onSelect && onSelect(spot)}
      className={`bg-neutral-950/95 relative transition-all duration-300 *:select-none overflow-visible ${
        selected
          ? "border-neutral-700 md:border-primary h-72 bg-neutral-700/20"
          : "border-neutral-800 h-24"
      } border w-full z-2 flex flex-col gap-2 p-2 rounded-lg min-w-[200px] overflow-invisible`}
    >
      {spot.verificado!==null ? <MarcaVerificado fecha={spot.verificado.fechaVerificacion} /> : <IndicadorCobertura />}

      <MainInfo spot={spot} />

      <div
        className={`flex flex-col justify-between w-full h-full ${
          selected ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <BotoneraCompartir googlePlaceId={spot.googlePlaceId} />
        <Comentarios comentarios={spot.comentarios} />
        {/* <MensajeUltimaValoracion /> */}
        <BotonesLikeDislike spot={spot} onChangeSpotCallback={onChangeSpotCallback} />
      </div>

      <Image
        width={200}
        height={200}
        alt="Imagen futbolin"
        src={imagen}
        className="z-1 absolute right-0 top-0 h-24 w-auto"
      />
    </div>
  );
};
