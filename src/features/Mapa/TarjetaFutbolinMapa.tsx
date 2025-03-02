import { IMarker } from "@/shared/types/Marker/IMarker";
import {
  faHeart,
  faHeartCrack,
  faLocationDot,
  faStore
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface TarjetaFutbolinMapaProps {
  selectedMarker: IMarker | null;
}

export const TarjetaFutbolinMapa = (props: TarjetaFutbolinMapaProps) => {
  const { selectedMarker } = props;

  const handleClick = () => {
    const placeId = selectedMarker?.data.googlePlaceId;
    if (!placeId) return;
  
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
    let url;
    if (isMobile) {
      url = `comgooglemaps://?q=place_id:${placeId}`;
    } else {
      url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    }
    
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white text-black">
        <span className="flex flex-col gap-2 max-w-9/12 h-full">
          <p className="font-extrabold text-primary text-xl">
            {selectedMarker?.data?.tipoFutbolin}
          </p>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon className='w-5' icon={faStore} />
            <p className="text-black truncate">
              {selectedMarker?.data?.nombre}
            </p>
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon className='w-5' icon={faLocationDot} />
            <p className="text-black truncate">
              {selectedMarker?.data?.direccion}
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
          <button
            onClick={handleClick}
            className="w-fit text-neutral-500 text-sm mt-auto"
          >
            Abrir con Google Maps
          </button>
        </span>
    </div>
  );
};
