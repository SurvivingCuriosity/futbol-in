import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayView } from "@react-google-maps/api";
import React, { memo } from "react";

export interface CustomMarkerProps {
  marker: IMarker;
  isSelected?: boolean;
  onClick: (marker: IMarker) => void;
}

/**
 * Componente que renderiza un OverlayView personalizado
 * con un Marcador (icono) clickable.
 */
function CustomMarkerComponent({
  marker,
  onClick,
  isSelected,
}: CustomMarkerProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick(marker);
  };

  return (
    <OverlayView
      position={{ lat: marker.lat, lng: marker.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          transform: "translate(-50%, -100%)",
        }}
      >
        <Marcador lugar={marker.data} isSelected={isSelected} />
      </div>
    </OverlayView>
  );
}

// React.memo para evitar re-renders del OverlayView
// si no cambian `marker`, `isSelected` u `onClick`.
export const CustomMarker = React.memo(CustomMarkerComponent);

interface MarcadorProps {
  lugar: IMapItem;
  isSelected?: boolean;
}

function MarcadorComponent({ isSelected }: MarcadorProps) {
  return (
    <FontAwesomeIcon
      icon={faFutbol}
      className={`${
        isSelected ? "text-black bg-primary" : "text-black bg-white"
      } aspect-square text-xl rounded-full`}
    />
  );
}

export const Marcador = memo(MarcadorComponent);
