import { useEffect, useRef } from "react";

interface AdvancedMarkerProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
}

export function MarcadorUsuario({
  map,
  position,
}: AdvancedMarkerProps) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (!map) return;

    // Creamos el contenido del marcador como un elemento HTML
    const markerView = document.createElement("div");
    const wrapperTop = `<div class="rounded-full size-10 p-0.5 flex items-center justify-center">`;
    const wrapperBottom = `</div>`;
    markerView.innerHTML =
      wrapperTop +
      (
        `<img src="/futbolin-logo.svg" width="22" height="22" />`) +
      wrapperBottom;

    markerView.style.cursor = "pointer";

    // Creamos el AdvancedMarkerElement
    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      content: markerView, // Aquí va tu HTML
    });

    // Guardamos la instancia en la ref
    markerRef.current = advancedMarker;

    // Cleanup cuando se desmonte el componente
    return () => {
      advancedMarker.map = null;
      markerRef.current = null;
    };
  }, [map, position]);

  return null;
}
