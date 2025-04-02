import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { useEffect, useRef } from "react";

interface AdvancedMarkerProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  tipoFutbolin: TipoFutbolin;
  onClick?: () => void;
}

const htmlContentMap: Record<TipoFutbolin, string> = {
  [TipoFutbolin.TSUNAMI]: `<img src="/logos/tsunami.png" width="32" height="32" />`,
  [TipoFutbolin.PRESAS]: `<img src="/logos/presas.png" width="32" height="32" />`,
  [TipoFutbolin.PRESAS_EVO]: `<img src="/logos/presas_evo.png" width="32" height="32" />`,
  [TipoFutbolin.DESCONOCIDO]: `<img src="/logos/desconocido.png" width="32" height="32" />`,
  [TipoFutbolin.MADERA]: `<img src="/logos/madera.png" width="32" height="32" />`,
  [TipoFutbolin.INFINITY]: `<img src="/logos/infinity.png" width="32" height="32" />`,
  [TipoFutbolin.CUALQUIERA]: `<img src="/logos/desconocido.png" width="32" height="32" />`,
};

export function AdvancedMarker({
  map,
  position,
  onClick,
  tipoFutbolin,
}: AdvancedMarkerProps) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  useEffect(() => {
    if (!map) return;

    // Creamos el contenido del marcador como un elemento HTML
    const markerView = document.createElement("div");
    const wrapperTop = `<div class="bg-neutral-900 rounded-full size-10 p-0.5 flex items-center justify-center">`;
    const wrapperBottom = `</div>`;
    markerView.innerHTML =
      wrapperTop +
      (htmlContentMap[tipoFutbolin] ||
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

    // Listener del clic
    if (onClick) {
      advancedMarker.addListener("gmp-click", () => {
        onClick();
      });
    }

    // Cleanup cuando se desmonte el componente
    return () => {
      advancedMarker.map = null;
      markerRef.current = null;
    };
  }, [map, position, tipoFutbolin, onClick]);

  return null; // No renderiza nada, pues el marcador vive en el mapa
}
