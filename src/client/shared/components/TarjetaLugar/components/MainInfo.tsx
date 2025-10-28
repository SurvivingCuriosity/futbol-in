import { ImagenFutbolinMap } from "@/client/shared/constants/FutbolinesImageMap";
import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { TipoFutbolinNombre } from "futbol-in-core/enum";
import { SpotDTO } from "futbol-in-core/types";
import {
  faLocationDot,
  faStore
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { MarcaVerificado } from "./MarcaVerificado";

export const MainInfo = ({
  spot,
  isOpen,
}: {
  spot: SpotDTO;
  isOpen: boolean;
}) => {
  
  const imagen = ImagenFutbolinMap[spot.tipoFutbolin];
  const logo = ImagenFutbolinLogoMap[spot.tipoFutbolin];

  return (
    <>
      <div className="rounded-lg w-full flex justify-between">
        <div className="w-full relative z-2">
          <div className="flex items-center gap-1 text-neutral-300 z-3">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="w-10"
            />
            <p className="text-lg font-bold">{TipoFutbolinNombre[spot.tipoFutbolin]}</p>
          </div>

          <div className="mt-2 ml-1 space-y-1 z-3 relative">
            <div className="flex items-center gap-1 text-neutral-300 text-sm">
              <FontAwesomeIcon className="w-6" icon={faStore} />
              <p className={`${isOpen ? "" : "truncate"}`}>{spot.nombre}</p>
            </div>
            <div className="flex items-center gap-1 text-neutral-300 text-sm">
              <FontAwesomeIcon className="w-6" icon={faLocationDot} />
              <p className={`${isOpen ? "" : "truncate"}`}>{spot.direccion}</p>
            </div>
            {/* {spot.verificado && (
              <MarcaVerificado
                fecha={new Date(spot.verificado.fechaVerificacion)}
                correcto={spot.verificado.correcto}
              />
            )} */}
          </div>
        </div>
        <Image
              src={imagen}
              alt="Imagen futbolin"
              width={200}
              height={200}
              className="w-44 h-auto object-cover absolute -top-2 -right-2 z-1"
            />

        </div>
    </>
  );
};
