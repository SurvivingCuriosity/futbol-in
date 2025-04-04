import { Colapsable } from "@/packages/components/Colapsable";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { useEffect, useState } from "react";
import { useGetLoggedInUserClient } from "../../hooks/useGetLoggedInUserClient";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonesLikeDislike } from "./components/BotonesLikeDislike";
import { Comentarios } from "./components/Comentarios";
import { IndicadorCobertura } from "./components/IndicadorCobertura";
import { MainInfo } from "./components/MainInfo";
import Image from "next/image";
import { ImagenFutbolinLogoMap } from "../../constants/FutbolinesLogoImageMap";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO | null) => void;
  distanciaMessage: string | null;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const { spot: spotProp, selected, onSelect, distanciaMessage } = props;

  const user = useGetLoggedInUserClient();

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  useEffect(() => {
    setSpot(spotProp);
  }, [spotProp]);

  const onChangeSpotCallback = (newSpot: SpotDTO) => {
    setSpot(newSpot);
  };

  const agregadoPorUsuario = spot.addedByUserId === user?.id;

  const handleClickSpot = () => {
    if (!onSelect) return;
    onSelect(selected ? null : spot);
  };

  const logo = ImagenFutbolinLogoMap[spot.tipoFutbolin];

  console.log(spot.tipoFutbolin)

  return (
    <>
      <Colapsable
        containerClassName={`${
          selected ? "border-primary" : "border-neutral-700"
        } relative p-2 md:p-3 border bg-neutral-900 rounded-lg select-none md:min-w-[400px] overflow-hidden`}
        open={!!selected}
        visibleContent={
          <>
            <Image
              src={logo}
              alt={`Logo ${spot.tipoFutbolin}`}
              width={200}
              height={200}
              className="w-40 absolute -top-10 -left-2 z-50 -rotate-12 opacity-5"
            />
            <div onClick={handleClickSpot} className="relative">
              {spot.verificado === null && (
                <IndicadorCobertura
                  downVotes={spot.votes.down.length}
                  upVotes={spot.votes.up.length}
                />
              )}
              <MainInfo
                spot={spot}
                distanciaMessage={distanciaMessage}
                isOpen={!!selected}
              />
            </div>
          </>
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
