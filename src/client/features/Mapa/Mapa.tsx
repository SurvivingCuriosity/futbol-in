"use client";

import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useRef } from "react";
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
  /* 1. Carga de librerías de Google Maps                                 */
  /* -------------------------------------------------------------------- */
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries: markerLibrary,
  });

  /* -------------------------------------------------------------------- */
  /* 2. Refs para mapa y clúster                                          */
  /* -------------------------------------------------------------------- */
  const mapRef = useRef<google.maps.Map | null>(null);
  const clusterRef = useRef<MarkerClusterer | null>(null);

  /* -------------------------------------------------------------------- */
  /* 3. Centrado automático cuando se selecciona un marcador              */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!mapRef.current || !selectedMarker) return;
    const [lng, lat] = selectedMarker.coordinates;
    mapRef.current.setZoom(18);
    mapRef.current.setCenter({ lat: lat - 0.0005, lng });
  }, [selectedMarker]);

  /* -------------------------------------------------------------------- */
  /* 4. Construcción de marcadores + clúster cada vez que cambian         */
  /*    los spots o se carga el mapa                                      */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    /* A) Si ya existe un clúster, lo limpiamos para reconstruir */
    if (clusterRef.current) {
      clusterRef.current.clearMarkers();
    }

    /* B) Creamos los AdvancedMarkerElement y les añadimos manejador */
    const googleMarkers = markers.map((spot) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: spot.coordinates[1],
          lng: spot.coordinates[0],
        },
        content: MarcadorFutbolin.getHTML(spot.tipoFutbolin), // helper estático
      });

      marker.addListener("click", () => onSelectMarker(spot));
      return marker;
    });

    const customRenderer = {
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
          zIndex: 1000, // para que quede por encima de los pines
        });
      },
    };

    /*** 1B. Con SuperClusterAlgorithm (default): radius en px ***/
    const superAlgo = new SuperClusterAlgorithm({
      radius: 80, // radio del círculo de agrupación
      minPoints: 3, // idem mínimo
      maxZoom: 18,
    });

    /* C) Creamos/actualizamos el clúster */
    clusterRef.current = new MarkerClusterer({
      map: mapRef.current,
      markers: googleMarkers,
      // renderer, algorithm, etc. → personaliza aquí si lo necesitas
      algorithm: superAlgo,
      renderer: customRenderer,
    });

    /* D) Limpieza al desmontar */
    return () => {
      clusterRef.current?.clearMarkers();
      googleMarkers.forEach((m) => (m.map = null));
    };
  }, [isLoaded, markers, onSelectMarker]);

  /* -------------------------------------------------------------------- */
  /* 5. Manejador de clic en mapa → deseleccionar marcador                */
  /* -------------------------------------------------------------------- */
  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      onSelectMarker(null);
      e.stop();
    },
    [onSelectMarker]
  );

  /* -------------------------------------------------------------------- */
  /* 6. Render                                                             */
  /* -------------------------------------------------------------------- */
  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;
  if (!initialCenter) return <div>Navegando...</div>;

  return (
    <GoogleMap
      onLoad={(m) => {
        // ← llaves ⇒ sin return
        mapRef.current = m;
      }}
      onUnmount={() => {
        mapRef.current = null;
      }}
      mapContainerStyle={{ width: "100%", height: "100%", zIndex: 1 }}
      center={initialCenter}
      onClick={handleMapClick}
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
      {/* Marcador de la posición del usuario no entra en el clúster */}
      <MarcadorUsuario
        map={mapRef.current}
        position={userLocation}
        show={!!userLocation}
      />
    </GoogleMap>
  );
}
