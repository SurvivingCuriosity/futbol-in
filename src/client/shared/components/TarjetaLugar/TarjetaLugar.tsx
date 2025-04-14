import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImagenFutbolinLogoMap } from "../../constants/FutbolinesLogoImageMap";
import { MainInfo } from "./components/MainInfo";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO | null) => void;
  distanciaMessage: string | null;
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const { spot: spotProp, selected, onSelect, distanciaMessage } = props;

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
    <div
      className={`relative p-2 md:p-3 border border-neutral-700 bg-neutral-900 rounded-lg select-none w-full md:min-w-[400px] overflow-hidden`}
    >
      <Image
        src={logo}
        alt={`Logo ${spot.tipoFutbolin}`}
        width={200}
        height={200}
        className="w-40 absolute -top-10 -left-2 z-1 -rotate-12 opacity-5"
      />
      <div onClick={handleClickSpot} className="relative">
        <MainInfo spot={spot} isOpen={!!selected} />
        <div className="w-full flex justify-between items-center mt-2">
          {distanciaMessage && (
            <span className="flex items-center gap-1 text-neutral-400 z-2">
              <FontAwesomeIcon icon={faLocationCrosshairs} />
              <p>{distanciaMessage}</p>
            </span>
          )}
          <Link href={`/spots/detalle/${spot.id}`} className="ml-auto z-2 text-neutral-400 p-0.5">Más detalles</Link>
        </div>
      </div>
    </div>
  );
};
