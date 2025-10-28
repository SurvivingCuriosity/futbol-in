"use client";

import {
  faHand,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImagenFutbolinLogoMap } from "../../constants/FutbolinesLogoImageMap";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { MainInfo } from "./components/MainInfo";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO | null) => void;
  distanciaMessage: string | null;
  googleInfo?: (google.maps.places.PlaceResult & CurrentOpening) | undefined;
}

export type CurrentOpening = {
  current_opening_hours: {
    open_now: boolean;
  };
};

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const {
    googleInfo,
    spot: spotProp,
    selected,
    onSelect,
    distanciaMessage,
  } = props;

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  useEffect(() => {
    setSpot(spotProp);
  }, [spotProp]);

  const handleClickSpot = () => {
    if (!onSelect) return;
    onSelect(selected ? null : spot);
  };

  const logo = ImagenFutbolinLogoMap[spot.tipoFutbolin];

  return (
    <Link
      href={`/futbolines/${spot.id}`}
      className={`block group relative p-2 md:p-3 border border-neutral-700 bg-neutral-900 rounded-lg select-none w-full md:min-w-[400px] overflow-hidden`}
    >
      <span className="absolute top-1 right-1 z-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <BotoneraCompartir
          googlePlaceId={spot.googlePlaceId}
          idSpot={spot.id}
        />
      </span>

      <Image
        src={logo}
        alt={`Logo ${spot.tipoFutbolin}`}
        width={200}
        height={200}
        className="w-40 absolute -top-10 -left-2 z-1 -rotate-12 opacity-5 pointer-events-none"
      />
      {googleInfo && googleInfo?.current_opening_hours?.open_now === true && (
        <div className="flex items-center gap-1 rounded text-xs text-primary w-min p-0.5">
          <FontAwesomeIcon icon={faHand} className="mr-1" />
          Abierto
        </div>
      )}
      <div onClick={handleClickSpot} className="relative">
        <MainInfo spot={spot} isOpen={!!selected} />
        <div className="w-full flex justify-between items-center mt-2">
          {distanciaMessage && (
            <span className="flex items-center gap-1 text-neutral-400 z-2">
              <FontAwesomeIcon icon={faLocationCrosshairs} />
              <p>{distanciaMessage}</p>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
