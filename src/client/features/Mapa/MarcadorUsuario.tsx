// MarcadorUsuario.tsx
"use client";

import { useEffect, useRef } from "react";

interface MarcadorUsuarioProps {
  /** Instancia del mapa (puede ser null mientras carga) */
  map: google.maps.Map | null;
  /** Coordenadas actuales del usuario */
  position: google.maps.LatLngLiteral | null;
  /** Mostrar / ocultar el marcador */
  show?: boolean;
}

/**
 * Marcador del usuario:
 * ▸ Se crea UNA sola vez.
 * ▸ Después solo se actualizan `position` y `map`.
 */
export function MarcadorUsuario({
  map,
  position,
  show = false,
}: MarcadorUsuarioProps) {
  /** Guarda la instancia del AdvancedMarkerElement */
  const markerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  /** Contenido HTML del marcador (se crea una sola vez) */
  const contentRef = useRef<HTMLDivElement | null>(null);
  if (!contentRef.current) {
    const div = document.createElement("div");
    div.className =
      "rounded-full size-10 p-0.5 flex items-center justify-center";
    div.innerHTML = `<img src="/futbolin-logo.svg" width="22" height="22" />`;
    contentRef.current = div;
  }

  useEffect(() => {
    // Si no hay mapa todavía, no hacemos nada
    if (!map) return;

    // 1. Crear el marcador la primera vez
    if (!markerRef.current) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: show && position ? map : null,
        position: position ?? undefined,
        content: contentRef.current!,
      });
    }

    // 2. Actualizar posición y visibilidad en renders posteriores
    if (markerRef.current) {
      markerRef.current.position = position ?? undefined;
      markerRef.current.map = show && position ? map : null;
    }

    // 3. Cleanup al desmontar
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
    };
  }, [map, position, show]);

  return null;
}

/**
 * Helper para reutilizar el HTML del marcador en otros componentes.
 */
MarcadorUsuario.getHTML = () => {
  const wrapper = document.createElement("div");
  wrapper.className =
    "rounded-full size-10 p-0.5 flex items-center justify-center";
  wrapper.innerHTML = `<img src="/futbolin-logo.svg" width="22" height="22" />`;
  return wrapper;
};
