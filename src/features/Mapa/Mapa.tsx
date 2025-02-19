import React, { useState, useEffect } from "react";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export interface MapaProps {
  markers: IMarker[];
}

const defaultCenter = { lat: 40.4167, lng: -3.7033 };

export const Mapa = ({ markers }: MapaProps) => {
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
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        center={center}
        zoom={zoom}
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
          minZoom: 5,
        }}
      >
        {markers?.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            icon={m.iconUrl}
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
