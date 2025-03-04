"use client";

import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import { useUserLocation } from "@/shared/services/UserLocation/useUserLocation";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";

const defaultCenter = { lat: 40.9629936, lng: -5.6612327 };

export interface MapaProps {
  markers: LugarDTO[];
  onSelectMarker: (marker: LugarDTO | null) => void;
  selectedMarker: LugarDTO | null;
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
    const lat = selectedMarker?.location.coordinates[1];
    const lng = selectedMarker?.location.coordinates[0];

    if (map && selectedMarker && lat && lng) {
      map.panTo({ lat: lat - 0.0005, lng });
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
        height: "100%",
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
      {markers.map((m, index) => {
        const lat = m.location.coordinates[1];
        const lng = m.location.coordinates[0];

        return (
          <Marker
            key={m.googlePlaceId + index}
            position={{ lat, lng }}
            icon={{
              url: "/futbolin-logo.svg",
              scaledSize: new window.google.maps.Size(28, 28),
            }}
            onClick={() => onSelectMarker(m)}
          />
        );
      })}

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
