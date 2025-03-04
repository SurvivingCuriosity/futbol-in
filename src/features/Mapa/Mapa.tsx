import { useUserLocation } from "@/shared/services/UserLocation/useUserLocation";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";

const defaultCenter = { lat: 40.9629936, lng: -5.6612327 };

export interface MapaProps {
  markers: IMarker[];
  onSelectMarker: (marker: IMarker | null) => void;
  selectedMarker: IMarker | null;
}

export function Mapa(props: MapaProps) {
  const { markers, onSelectMarker, selectedMarker } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const userLocation = useUserLocation();

  const zoom = useMemo(() => (userLocation ? 14 : 13), [userLocation]);

  useEffect(() => {
    if (map && selectedMarker) {
      map.panTo({ lat: selectedMarker.lat - 0.0005, lng: selectedMarker.lng });
      map.setZoom(18); // Ajusta el nivel de zoom a tu gusto
    }
  }, [map, selectedMarker]);

  const handleMapClick = React.useCallback(
    (e: google.maps.MapMouseEvent) => {
      onSelectMarker(null); // Selecciona el marker
      e.stop();
    },
    [onSelectMarker]
  );

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      onLoad={(mapInstance) => setMap(mapInstance)}
      mapContainerStyle={{
        width: "100%",
        height: "calc(100vh - 5em)",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      center={defaultCenter}
      zoom={zoom}
      onClick={handleMapClick}
      options={{
        disableDefaultUI: true,
        gestureHandling: "greedy",
        controlSize: 2,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: true,
        tilt: 45,
        heading: 0,
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
      }}
    >
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={{ lat: m.lat, lng: m.lng }}
          icon={{
            url: "/futbolin-logo.svg",
            scaledSize: new window.google.maps.Size(28, 28),
          }}
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
  );
}
