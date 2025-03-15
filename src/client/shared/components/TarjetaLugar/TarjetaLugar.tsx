// import generico from "@/shared/assets/img/generico.webp";
// import genericomadera from "@/shared/assets/img/genericomadera.jpg";
// import infinty from "@/shared/assets/img/infinity.jpg";
// import presas from "@/shared/assets/img/presas.jpg";
// import presasevo from "@/shared/assets/img/presasevo.jpg";
// import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";

import { Colapsable } from "@/packages/components/Colapsable";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { useState } from "react";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonesLikeDislike } from "./components/BotonesLikeDislike";
import { Comentarios } from "./components/Comentarios";
import { IndicadorCobertura } from "./components/IndicadorCobertura";
import { MainInfo } from "./components/MainInfo";
import { MarcaVerificado } from "./components/MarcaVerificado";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO) => void;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const { spot: spotProp, selected, onSelect } = props;

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  const onChangeSpotCallback = (newSpot: SpotDTO) => {
    console.log(newSpot)
    setSpot(newSpot);
  };

  // const imageMap: Record<
  //   Exclude<TipoFutbolin, TipoFutbolin.CUALQUIERA>,
  //   StaticImageData
  // > = {
  //   [TipoFutbolin.TSUNAMI]: tsunami_zoom,
  //   [TipoFutbolin.PRESAS]: presas,
  //   [TipoFutbolin.PRESAS_EVO]: presasevo,
  //   [TipoFutbolin.GENERICO]: generico,
  //   [TipoFutbolin.GENÉRICO_MADERA]: genericomadera,
  //   [TipoFutbolin.INFINITY]: infinty,
  // };

  // const imagen =
  //   imageMap[
  //     spot.tipoFutbolin as Exclude<TipoFutbolin, TipoFutbolin.CUALQUIERA>
  //   ];

  return (
    <>
      {" "}
      <Colapsable
        containerClassName="relative p-2 border border-neutral-700 rounded-lg select-none"
        open={!!selected}
        visibleContent={
          <div onClick={() => onSelect && onSelect(spot)}>
            {spot.verificado !== null ? (
              <MarcaVerificado fecha={new Date(spot.verificado.fechaVerificacion)} />
            ) : (
              <IndicadorCobertura />
            )}

            <MainInfo spot={spot} />
          </div>
        }
        extraContent={
          <div
            className={`flex flex-col justify-between w-full h-full ${
              selected ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <BotoneraCompartir googlePlaceId={spot.googlePlaceId} />
            <Comentarios comentarios={spot.comentarios} />
            {/* <MensajeUltimaValoracion /> */}
            <BotonesLikeDislike
              spot={spot}
              onChangeSpotCallback={onChangeSpotCallback}
            />
          </div>
        }
      ></Colapsable>
    </>
  );
};
