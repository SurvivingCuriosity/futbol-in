"use client";

import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { MarcadorFutbolin } from "./MarcadorFutbolin";
import { MarcadorUsuario } from "./MarcadorUsuario";

export interface MapaProps {
  markers: SpotDTO[];
  onSelectMarker: (marker: SpotDTO | null) => void;
  selectedMarker: SpotDTO | null;
  userLocation: google.maps.LatLngLiteral | null;
  initialCenter: google.maps.LatLngLiteral | null;
  zoom?: number;
  restrictToSpain?:boolean;
}

const markerLibrary = ["marker"] as Libraries;

export function Mapa(props: MapaProps) {
  const {
    markers,
    onSelectMarker,
    selectedMarker,
    userLocation,
    initialCenter,
    zoom = 14,
    restrictToSpain = true,
  } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries: markerLibrary,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const lat = selectedMarker?.coordinates[1];
    const lng = selectedMarker?.coordinates[0];

    if (map && selectedMarker && lat && lng) {
      map.setZoom(18);
      map.setCenter({ lat: lat - 0.0005, lng });
    }
  }, [selectedMarker, map]);

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
        zoom: zoom,
        minZoom: 1,
        maxZoom: 20,
        zoomControl: false,
        mapId: "729d891f5d94366",
        restriction: restrictToSpain
          ? {
              latLngBounds: {
                north: 46.0,
                south: 33.0,
                west: -10.5,
                east: 6.5,
              },
              strictBounds: false,
            }
          : null,
      }}
    >
      {markers.map((m, index) => {
        const lat = m.coordinates[1];
        const lng = m.coordinates[0];

        return (
          <MarcadorFutbolin
            key={m.googlePlaceId + index}
            map={map}
            position={{ lat, lng }}
            tipoFutbolin={m.tipoFutbolin}
            onClick={() => onSelectMarker(m)}
          />
        );
      })}

      <MarcadorUsuario map={map} position={userLocation} show={!!userLocation} />
    </GoogleMap>
  );
}
