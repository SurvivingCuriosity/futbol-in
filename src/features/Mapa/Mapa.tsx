import { IMarker } from "@/shared/types/Marker/IMarker";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export interface MapaProps {
  markers: IMarker[];
}

const defaultCenter = { lat: 40.9629936, lng: -5.661232699999999 };

export interface MapaProps {
  markers: IMarker[];
  onSelectMarker: (marker: IMarker|null) => void;
}

export const Mapa = (props: MapaProps) => {

  const { markers, onSelectMarker } = props;

  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario", error);
        },
        {
          enableHighAccuracy: true, // Solicita la mayor precisión posible
          maximumAge: 10000,        // Permite reutilizar una posición obtenida en los últimos 10 segundos
          timeout: 5000             // Tiempo máximo de espera para obtener la posición
        }
      );
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("La geolocalización no es soportada en este navegador.");
    }
  }, []);

  // Si se obtiene la ubicación del usuario, se centra ahí con mayor zoom
  const center = userLocation || defaultCenter;
  const zoom = userLocation ? 14 : 6;

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "calc(100vh - 5em)", position: 'absolute', top: 0, left: 0 }}
        center={center}
        zoom={zoom}
        onClick={()=>onSelectMarker(null)}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          rotateControl: false,
          scaleControl: false,
          zoomControl: false,
          mapId: "729d891f5d94366",
          restriction: {
            latLngBounds: {
              north: 43.79,
              south: 36.0,
              west: -9.3,
              east: 4.3,
            },
            strictBounds: false,
          },
          center: defaultCenter,
          minZoom: 5,
          zoom: 14
        }}
      >
        {markers?.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            icon={m.iconUrl}
            onClick={() => onSelectMarker(m)}
          />
        ))}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};
