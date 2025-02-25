import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { OverlayView } from "@react-google-maps/api";

export interface CustomMarkerProps {
  marker: IMarker;
  onClick: (marker: IMarker) => void;
}

export const CustomMarker = ({ marker, onClick }: CustomMarkerProps) => {
  return (
    <OverlayView
      position={{ lat: marker.lat, lng: marker.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        onClick={() => onClick(marker)}
        style={{
          cursor: "pointer",
          transform: "translate(-50%, -100%)", // Ajusta el posicionamiento según sea necesario
        }}
      >
        <Marcador lugar={marker.data} />
      </div>
    </OverlayView>
  );
};

export const Marcador = ({lugar}:{lugar:IMapItem}) => {
  return (
      <div className="border-2 border-primary bg-neutral-800 rounded-full size-5 aspect-square">
        {lugar.nombre.charAt(0).toUpperCase()}
      </div>
  );
};
