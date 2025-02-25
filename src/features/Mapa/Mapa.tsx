import { IMarker } from "@/shared/types/Marker/IMarker";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { CustomMarker } from "./CustomMarker";

const defaultCenter = { lat: 40.9629936, lng: -5.661232699999999 };

export interface MapaProps {
  markers: IMarker[];
  onSelectMarker: (marker: IMarker | null) => void;
}

export const Mapa = (props: MapaProps) => {
  const { markers, onSelectMarker } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script", // Mismo id para evitar recargas
  });

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) =>
          console.error("Error obteniendo la ubicación del usuario", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("La geolocalización no es soportada en este navegador.");
    }
  }, []);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  const center = userLocation || defaultCenter;
  const zoom = userLocation ? 14 : 6;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "calc(100vh - 5em)",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      center={center}
      zoom={zoom}
      onClick={() => onSelectMarker(null)}
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
        zoom: 14,
      }}
    >
      {markers?.map((m) => (
        <CustomMarker
          key={m.id}
          marker={m}
          onClick={onSelectMarker}
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
  );
};
