"use client";

import { IMarker } from "@/shared/types/Marker/IMarker";
import { useEffect, useState } from "react";
import { Mapa } from "./Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "futbol-in-ui";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";

export const MapaPage = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);

  useEffect(() => {
    fetchFutbolines(40.9629936, -5.661232699999999);
  }, []);

  async function fetchFutbolines(lat: number, lng: number, maxDistance = 5000) {
    const res = await fetch(
      `/api/get-futbolines?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`
    );
    const data = await res.json();
    console.log(data)
    const markers = data.data.map((f: IMapItem, index: number) => ({
      id: index,
      lat: Number(f.lat),
      lng: Number(f.lng),
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      data: f,
    }));
    setMarkers(markers);
  }

  const handleSelectMarker = (marker: IMarker) => {
    setSelectedMarker(marker)
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-2 right-2 z-1 bg-neutral-800 text-primary p-4 rounded-md border">
        <span className="flex items-center gap-2">
          <p className="text-white">Search area</p>
          <FontAwesomeIcon icon={faFilter} />
        </span>
        <TextInput placeholder="Introduce una ciudad" />
      </div>
      <div className="absolute bottom-24 right-2 z-1 bg-neutral-800 text-primary p-4 rounded-md border">
        <span className="flex items-center gap-2">
          <p className="text-white">{selectedMarker?.data?.nombre}</p>
          <p className="text-white">{selectedMarker?.data?.tipoFutbolin}</p>
          <FontAwesomeIcon icon={faFilter} />
        </span>
        <TextInput placeholder="Introduce una ciudad" />
      </div>
      
      <Mapa markers={markers} onSelectMarker={handleSelectMarker} />
    </div>
  );
};
