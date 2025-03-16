import { Colapsable } from "@/packages/components/Colapsable";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { useState } from "react";
import { useGetLoggedInUserClient } from "../../hooks/useGetLoggedInUserClient";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonesLikeDislike } from "./components/BotonesLikeDislike";
import { Comentarios } from "./components/Comentarios";
import { IndicadorCobertura } from "./components/IndicadorCobertura";
import { MainInfo } from "./components/MainInfo";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO|null) => void;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const { spot: spotProp, selected, onSelect } = props;

  const user = useGetLoggedInUserClient();

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  const onChangeSpotCallback = (newSpot: SpotDTO) => {
    setSpot(newSpot);
  };

  const agregadoPorUsuario = spot.addedByUserId === user?.id;

  return (
    <>
      <Colapsable
        containerClassName={`${
          selected ? "border-primary" : "border-neutral-700"
        } relative p-3 border bg-neutral-900/90 rounded-lg select-none min-w-[400px]`}
        open={!!selected}
        visibleContent={
          <div onClick={() => onSelect && onSelect(selected ? null : spot)} className="relative">
            {spot.verificado === null && (
              <IndicadorCobertura
                downVotes={spot.votes.down.length}
                upVotes={spot.votes.up.length}
              />
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
              agregadoPorUsuario={agregadoPorUsuario}
            />
          </div>
        }
      ></Colapsable>
    </>
  );
};
