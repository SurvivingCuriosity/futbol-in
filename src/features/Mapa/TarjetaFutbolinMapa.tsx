import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";
import { IMarker } from "@/shared/types/Marker/IMarker";
import {
  faHeart,
  faHeartCrack,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
export interface TarjetaFutbolinMapaProps {
  selectedMarker: IMarker | null;
  show: boolean;
}

export const TarjetaFutbolinMapa = (props: TarjetaFutbolinMapaProps) => {
  const { selectedMarker, show } = props;

  const handleClick = () => {
    // Puedes elegir el método que prefieras:

    // Opción 1: Usar latitud y longitud
    const url = `https://www.google.com/maps/place/?q=place_id:${selectedMarker?.data.googlePlaceId}`;

    // Opción 2: Usar el ID del sitio
    // const url = `https://www.google.com/maps/search/?api=1&query_place_id=${placeId}`;

    window.open(url, "_blank"); // Abre la URL en una nueva pestaña
  };

  return (
    <div
      className={`absolute bottom-0 left-0 ${
        show ? "-translate-y-0" : "translate-y-full"
      } transition-transform duration-300 z-1 `}
    >
      <div className="w-[500px] h-[200px] rounded-lg overflow-hidden">
        <div
          style={{ clipPath: "polygon(0 0, 80% 0, 50% 100%, 0 100%)" }}
          className="p-4 bg-black/90 absolute top-0 left-0 w-full h-full backdrop-blur-[2px] rounded-lg"
        >
          <span className="flex flex-col gap-2 max-w-9/12 h-full">
            <p className="font-extrabold text-primary text-xl">
              {selectedMarker?.data?.tipoFutbolin}
            </p>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="text-white truncate">
                {selectedMarker?.data?.nombre}
              </p>
            </span>
            <span className="flex flex-row gap-4 *:select-none">
              <span className="hover:bg-green-500/20 p-1 px-2 rounded flex items-center gap-1 flex-row text-green-500">
                <FontAwesomeIcon icon={faHeart} />5
              </span>
              <span className="hover:bg-red-500/20 p-1 px-2 rounded flex items-center gap-1 flex-row text-red-500">
                <FontAwesomeIcon icon={faHeartCrack} />0
              </span>
            </span>
            <button onClick={handleClick} className="w-fit text-neutral-500 text-sm mt-auto">
                Abrir con Google Maps
            </button>
          </span>
        </div>
        <Image
          width={200}
          height={200}
          alt="Imagen futbolin"
          src={tsunami_zoom}
          className="w-full"
        />
      </div>
    </div>
  );
};
