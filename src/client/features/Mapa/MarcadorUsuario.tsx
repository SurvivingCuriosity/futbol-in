import { useEffect, useRef } from "react";

interface AdvancedMarkerProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral|null;
  show?: boolean;
}

export function MarcadorUsuario({
  map,
  position = null,
  show = false
}: AdvancedMarkerProps) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (!map) return;

    // Creamos el contenido del marcador como un elemento HTML
    const markerView = document.createElement("div");
    const wrapperTop = 
      show ? `<div class="rounded-full size-10 p-0.5 flex items-center justify-center">`
      : `<div class="hidden">`

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

MarcadorUsuario.getHTML = (tipoFutbolin: string) => {
  const wrapper = document.createElement("div");
  wrapper.className = "rounded-full size-10 p-0.5 flex items-center justify-center";
  wrapper.innerHTML = `<img src="/iconos/${tipoFutbolin}.svg" width="22" height="22" />`;
  return wrapper;
};