"use client";

import { SpotDTO } from "futbol-in-core/types";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import {
  GoogleMap,
  Libraries,
  useLoadScript,
} from "@react-google-maps/api";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MarcadorFutbolin } from "./MarcadorFutbolin";
import { MarcadorUsuario } from "./MarcadorUsuario";

export interface MapaProps {
  markers: SpotDTO[];
  onSelectMarker: (marker: SpotDTO | null) => void;
  selectedMarker: SpotDTO | null;
  userLocation: google.maps.LatLngLiteral | null;
  initialCenter: google.maps.LatLngLiteral | null;
  zoom?: number;
  restrictToSpain?: boolean;
}

const markerLibrary = ["marker"] as Libraries;

export function Mapa({
  markers,
  onSelectMarker,
  selectedMarker,
  userLocation,
  initialCenter,
  zoom = 14,
  restrictToSpain = true,
}: MapaProps) {
  /* -------------------------------------------------------------------- */
  /* 1. Cargar SDK                                                         */
  /* -------------------------------------------------------------------- */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries: markerLibrary,
  });

  const memoCenter = useMemo(() => initialCenter, []);

  /* -------------------------------------------------------------------- */
  /* 2. Estado: mapa y clúster                                            */
  /* -------------------------------------------------------------------- */
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const clusterRef = useRef<MarkerClusterer | null>(null);

  /* -------------------------------------------------------------------- */
  /* 3. Ajuste de vista al seleccionar un marcador                        */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!map || !selectedMarker) return;
    const [lng, lat] = selectedMarker.coordinates;
    map.setZoom(18);
    map.setCenter({ lat: lat - 0.0005, lng });
  }, [map, selectedMarker]);

  /* -------------------------------------------------------------------- */
  /* 4. Instancias MEMO-izadas (algo y renderer)                          */
  /* -------------------------------------------------------------------- */
  const superAlgo = useMemo(
    () =>
      new SuperClusterAlgorithm({
        radius: 80,
        minPoints: 3,
        maxZoom: 18,
      }),
    [],
  );

  const clusterRenderer = useMemo(() => {
    return {
      render: ({
        count,
        position,
      }: {
        count: number;
        position: google.maps.LatLng;
      }) => {
        const svg = `
      <svg viewBox="0 0 40 40" width="40" height="40">
        <circle cx="20" cy="20" r="18"
          fill="var(--color-neutral-900)"
          stroke="var(--color-neutral-950)" stroke-width="2" />
        <text x="20" y="25" text-anchor="middle"
          font-size="14" font-weight="700" font-family="Poppins"
          fill="var(--color-primary)">${count}</text>
      </svg>`;

        const div = document.createElement("div");
        div.innerHTML = svg;

        return new google.maps.marker.AdvancedMarkerElement({
          position,
          content: div,
          zIndex: 1000,
        });
      },
    };
  }, []);

  /* -------------------------------------------------------------------- */
  /* 5. Construir marcadores cada vez que cambia `markers`                */
  /* -------------------------------------------------------------------- */
const googleMarkers = useMemo(() => {
  if (!isLoaded) return [];   //  ←⏳ hasta que exista window.google

  return markers.map((spot) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: spot.coordinates[1], lng: spot.coordinates[0] },
      content: MarcadorFutbolin.getHTML(spot.tipoFutbolin),
    });
    marker.addListener("click", () => {
      onSelectMarker(spot)
    });
    return marker;
  });
}, [isLoaded, markers, onSelectMarker]);

  /* -------------------------------------------------------------------- */
  /* 6. Crear / actualizar clúster cuando mapa o marcadores listos        */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!map) return;

    // A) Limpieza del anterior
    clusterRef.current?.clearMarkers();
    clusterRef.current?.setMap(null);

    // B) Crear nuevo clúster
    clusterRef.current = new MarkerClusterer({
      map,
      markers: googleMarkers,
      algorithm: superAlgo,
      renderer: clusterRenderer,
    });

    // C) Cleanup
    return () => {
      clusterRef.current?.clearMarkers();
      clusterRef.current?.setMap(null);
      clusterRef.current = null;
    };
  }, [map, googleMarkers, superAlgo, clusterRenderer]);

  /* -------------------------------------------------------------------- */
  /* 7. Click en el mapa → deseleccionar                                  */
  /* -------------------------------------------------------------------- */
  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      onSelectMarker(null);
      e.stop();
    },
    [onSelectMarker],
  );

  /* -------------------------------------------------------------------- */
  /* 8. Render                                                            */
  /* -------------------------------------------------------------------- */
  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;
  if (!initialCenter || !memoCenter) return <div>Navegando...</div>;

  return (
    <GoogleMap
      onLoad={(m) => setMap(m)}
      onUnmount={() => setMap(null)}
      mapContainerStyle={{ width: "100%", height: "100%", zIndex: 1 }}
      center={memoCenter}
      options={{
        disableDefaultUI: true,
        gestureHandling: "greedy",
        zoom,
        minZoom: 1,
        maxZoom: 20,
        zoomControl: false,
        mapId: "729d891f5d94366",
        restriction: restrictToSpain
          ? {
              latLngBounds: { north: 46, south: 33, west: -10.5, east: 6.5 },
              strictBounds: false,
            }
          : null,
      }}
      onClick={handleMapClick}
    >
      {/* Marcador del usuario (fuera del clúster) */}
      <MarcadorUsuario
        map={map}
        position={userLocation}
        show={!!userLocation}
      />
    </GoogleMap>
  );
}
