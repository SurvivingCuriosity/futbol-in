"use client";

import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";
import { Mapa } from "./Mapa";
import { TarjetaFutbolinMapa } from "./TarjetaFutbolinMapa";

export const MapaPage = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  useEffect(() => {
    fetchFutbolines(40.9629936, -5.661232699999999);
  }, []);

  async function fetchFutbolines(lat: number, lng: number, maxDistance = 5000) {
    const res = await fetch(
      `/api/get-futbolines?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`
    );
    const data = await res.json();
    const markers = data.data.map((f: IMapItem, index: number) => ({
      id: index,
      lat: Number(f.lat),
      lng: Number(f.lng),
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      data: f,
    }));
    setMarkers(markers);
  }

  const handleSelectMarker = (marker: IMarker | null) => {
    if (marker !== null) {
      setSelectedMarker(marker);
    }
    setMostrarTarjeta(marker !== null);
  };

  return (
    <div className="h-[calc(100dvh-4em)] w-full absolute top-0 left-0 overflow-hidden">
      <div className="z-1 bg-neutral-800 text-primary p-4 rounded-md border">
        <span className="flex items-center gap-2">
          <p className="text-white">Search area</p>
          <FontAwesomeIcon icon={faFilter} />
        </span>
        <TextInput placeholder="Introduce una ciudad" />
      </div>

      <TarjetaFutbolinMapa
        selectedMarker={selectedMarker}
        show={mostrarTarjeta}
      />

      <Mapa markers={markers} onSelectMarker={handleSelectMarker} />
    </div>
  );
};
