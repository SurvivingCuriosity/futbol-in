"use client";

import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { GoogleMap, Libraries, useLoadScript } from "@react-google-maps/api";
import { SpotDTO } from "futbol-in-core/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  focusCoords: google.maps.LatLngLiteral | null;
}

const markerLibrary = ["marker"] as Libraries;
const DEFAULT_ZOOM = 6;


export function Mapa({
  markers,
  onSelectMarker,
  selectedMarker,
  userLocation,
  initialCenter,
  zoom = DEFAULT_ZOOM,
  restrictToSpain = true,
  focusCoords
}: MapaProps) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    id: "google-maps-script",
    libraries: markerLibrary,
  });
  const [userZoom, setUserZoom] = useState<number>(zoom);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const memoCenter = useMemo(() => initialCenter, [initialCenter]);
  const clusterRef = useRef<MarkerClusterer | null>(null);


  useEffect(() => {
    if (!map || !selectedMarker) return;
    const [lng, lat] = selectedMarker.coordinates;
    map.panTo({ lat: lat - 0.0005, lng });
  }, [map, selectedMarker]);
  
  useEffect(()=>{
    if(!map || !focusCoords) return
    setUserZoom(16)
    map.panTo(focusCoords);
  },[focusCoords, map])

  useEffect(() => {
    if (!isLoaded) return;

    document.querySelectorAll(".marker-wrapper").forEach((el) => {
      el.classList.remove(
        "border-2!",
        "border-primary!",
        "bg-neutral-700!",
        "animate-bounce!"
      );
    });

    if (selectedMarker) {
      const el = document.querySelector(
        `.marker-wrapper[data-id="${selectedMarker.id}"]`
      );
      if (el) {
        el.classList.add(
          "border-2!",
          "border-primary!",
          "bg-neutral-700!",
          "animate-bounce!"
        );
      }
    }
  }, [selectedMarker, isLoaded]);

useEffect(() => {
  if (!map || !selectedMarker) return;

  // Limpia si ya existía
  const existing = document.querySelector("#selected-marker");
  if (existing) existing.remove();

  // Crea un clon visual del marcador
  const el = MarcadorFutbolin.getHTML(selectedMarker.tipoFutbolin, selectedMarker.id);
  el.id = "selected-marker";
  el.classList.add("animate-bounce", "border-2!", "border-primary!", "bg-neutral-800");

  const overlay = new google.maps.OverlayView();

  overlay.onAdd = function () {
    const panes = this.getPanes();
    if (!panes) return;
    const layer = panes.overlayMouseTarget;
    if (layer) layer.appendChild(el);
  };

  overlay.draw = function () {
    const projection = this.getProjection();
    if (!projection) return;
    const pos = new google.maps.LatLng(
      selectedMarker.coordinates[1],
      selectedMarker.coordinates[0]
    );
    const point = projection.fromLatLngToDivPixel(pos);
    if (point && el.style) {
      el.style.position = "absolute";
      el.style.left = `${point.x - 20}px`;
      el.style.top = `${point.y - 40}px`;
      el.style.zIndex = "99999";
    }
  };

  overlay.onRemove = function () {
    el.remove();
  };

  overlay.setMap(map);

  return () => {
    overlay.setMap(null);
  };
}, [map, selectedMarker]);

  /* --------------------- 4. Cluster config & renderer ---------------------- */
  const clusterAlgorithm = useMemo(
    () =>
      new SuperClusterAlgorithm({
        radius: 60,
        minPoints: 2,
        maxZoom: 15,
      }),
    []
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
            stroke="var(--color-neutral-700)" stroke-width="2" />
          <text x="20" y="25" text-anchor="middle"
            font-size="14" font-weight="500" font-family="Poppins"
            fill="var(--color-neutral-200)">${count}</text>
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

  /* ------------------------- 5. Crear marcadores ---------------------------- */
  const googleMarkers = useMemo(() => {
    if (!isLoaded) return [];
    return markers.map((spot) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: spot.coordinates[1], lng: spot.coordinates[0] },
        content: MarcadorFutbolin.getHTML(spot.tipoFutbolin, spot.id),
      });

      marker.addListener("click", () => onSelectMarker(spot));
      return marker;
    });
  }, [isLoaded, markers, onSelectMarker]);

  /* ------------------- 6. Crear / actualizar cluster ------------------------ */
  /* ------------------- 6. Crear / actualizar cluster ------------------------ */
  useEffect(() => {
    if (!map) return;

    // A) Limpieza del anterior
    clusterRef.current?.clearMarkers();
    clusterRef.current?.setMap(null);

    // B) Crear nuevo clúster — pero sin control automático de zoom ni re-fit
    const clusterer = new MarkerClusterer({
      map,
      markers: googleMarkers,
      algorithm: clusterAlgorithm,
      renderer: clusterRenderer,
    });

    // ⚠️ Evitamos que el clusterer manipule el viewport automáticamente
    clusterer.onClusterClick = (event, cluster) => {
      console.log("cluster click", cluster);
      const pos = cluster.position;
      console.log("pos", pos);
      if (!pos) return;

      // Animación manual y suave
      const currentZoom = map.getZoom() ?? zoom;
      const targetZoom = Math.min(currentZoom + 1.5, 18);

      map.panTo(pos);
      setUserZoom(targetZoom)
    };

    clusterRef.current = clusterer;

    return () => {
      clusterRef.current?.clearMarkers();
      clusterRef.current?.setMap(null);
      clusterRef.current = null;
    };
  }, [map, googleMarkers, clusterAlgorithm, clusterRenderer, zoom]);

  /* ----------------------- 7. Click fuera = limpiar ------------------------- */
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    onSelectMarker(null);
    e.stop()
  }, [onSelectMarker]);

  /* ------------------------------- 8. Render ------------------------------- */
  if (loadError) return <div className="text-center pt-20 text-red-500">Error cargando mapa {String(loadError)}</div>;
  if (!isLoaded) return <div className="text-center pt-20 text-neutral-500">Cargando mapa...</div>;
  if (!initialCenter || !memoCenter) return <div className="text-center pt-20 text-neutral-500">Navegando...</div>;
  
  return (
    <GoogleMap
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      mapContainerStyle={{ width: "100%", height: "100%", zIndex: 1 }}
      center={memoCenter}
      zoom={userZoom}
      options={{
        disableDefaultUI: true,
        gestureHandling: "greedy",
        minZoom: 4,
        maxZoom: 20,
        zoomControl: false,
        mapId: "729d891f5d94366",
        restriction: restrictToSpain
          ? {
              latLngBounds: { north: 45, south: 25, west: -20.5, east: 4 },
              strictBounds: false,
            }
          : undefined,
      }}
      onClick={handleMapClick}
    >
      <MarcadorUsuario map={map} position={userLocation} show={true} />
    </GoogleMap>
  );
}
