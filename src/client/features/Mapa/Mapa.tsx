"use client";

import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { AdvancedMarker } from "./AdvancedMarker";

export interface MapaProps {
  markers: SpotDTO[];
  onSelectMarker: (marker: SpotDTO | null) => void;
  selectedMarker: SpotDTO | null;
  userLocation: google.maps.LatLngLiteral | null;
  initialCenter: google.maps.LatLngLiteral | null;
}

const markerLibrary = "marker";

export function Mapa(props: MapaProps) {
  const {
    markers,
    onSelectMarker,
    selectedMarker,
    userLocation,
    initialCenter,
  } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries: [markerLibrary],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const lat = selectedMarker?.coordinates[1];
    const lng = selectedMarker?.coordinates[0];

    if (map && selectedMarker && lat && lng) {
      map.panTo({ lat: lat - 0.0005, lng });
      map.setZoom(18); // Ajusta el nivel de zoom a tu gusto
    }
  }, [map, selectedMarker]);

  const handleMapClick = React.useCallback(
    (e: google.maps.MapMouseEvent) => {
      onSelectMarker(null);
      e.stop();
    },
    [onSelectMarker]
  );

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;
  if (!initialCenter) return <div>Navegando...</div>;

  return (
    <GoogleMap
      onLoad={(mapInstance) => setMap(mapInstance)}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
      center={initialCenter}
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
        zoom: 14,
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
        const lat = m.coordinates[1];
        const lng = m.coordinates[0];

        return (
          <AdvancedMarker
            key={m.googlePlaceId + index}
            map={map} // le pasamos el map que tenemos en el estado
            position={{ lat, lng }}
            tipoFutbolin={m.tipoFutbolin}
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
