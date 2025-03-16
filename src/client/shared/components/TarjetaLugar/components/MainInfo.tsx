import { ImagenFutbolinMap } from "@/client/shared/constants/FutbolinesImageMap";
import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import {
  faLocationCrosshairs,
  faLocationDot,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { MarcaVerificado } from "./MarcaVerificado";

export const MainInfo = ({
  spot,
  distanciaMessage,
}: {
  spot: SpotDTO;
  distanciaMessage: string | null;
}) => {
  const imagen = ImagenFutbolinMap[spot.tipoFutbolin];
  const logo = ImagenFutbolinLogoMap[spot.tipoFutbolin];

  return (
    <div className="z-2 rounded-lg w-full flex justify-between">
      <div className="w-7/12">
        <div className="flex items-center gap-1 text-neutral-300">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <p className="text-lg font-bold">{spot.tipoFutbolin}</p>
        </div>

        <div className="mt-2 ml-1">
          <div className="flex items-center gap-1 text-neutral-400 text-sm">
            <FontAwesomeIcon className="w-4" icon={faStore} />
            <p className="whitespace-nowrap truncate max-w-10/12">
              {spot.nombre}
            </p>
          </div>
          <div className="flex items-center gap-1 text-neutral-400 text-sm">
            <FontAwesomeIcon className="w-4" icon={faLocationDot} />
            <p className="">{spot.direccion}</p>
          </div>
          {spot.verificado && (
            <MarcaVerificado
              fecha={new Date(spot.verificado.fechaVerificacion)}
              correcto={spot.verificado.correcto}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col h-full w-5/12">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={imagen}
            alt="Logo"
            width={200}
            height={200}
            className="w-full h-auto max-h-[90%] object-cover rounded-lg"
          />
        </div>
        {distanciaMessage && (
          <span className="flex items-center gap-1 mt-2 ml-auto text-neutral-400">
            <FontAwesomeIcon icon={faLocationCrosshairs} />
            <p>{distanciaMessage}</p>
          </span>
        )}
      </div>
    </div>
  );
};
