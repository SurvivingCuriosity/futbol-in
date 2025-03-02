"use client";

import DrawerNoSSR from "@/shared/components/BottomDrawer/Drawer";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { IMarker } from "@/shared/types/Marker/IMarker";
import { useCallback, useEffect, useState } from "react";
import { Mapa } from "./Mapa";
import { TarjetaFutbolinMapa } from "./TarjetaFutbolinMapa";

export const MapaPage = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  useEffect(() => {
    console.log(selectedMarker);
  }, [selectedMarker]);

  useEffect(() => {
    fetchFutbolines(40.9629936, -5.661232699999999);
  }, []);

  async function fetchFutbolines(lat: number, lng: number, maxDistance = 5000) {
    try {
      const res = await fetch(
        `/api/get-futbolines?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`
      );
      const data = await res.json();
      const markersFromApi = data.data.map((f: IMapItem, index: number) => ({
        id: index,
        lat: Number(f.lat),
        lng: Number(f.lng),
        iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        data: f,
      })) as IMarker[];
      setMarkers(markersFromApi);
    } catch (err) {
      console.error("Error fetching markers", err);
    }
  }

  const handleSelectMarker = useCallback((marker: IMarker | null) => {
    setSelectedMarker(marker);
    setMostrarTarjeta(marker !== null);
  }, []);

  return (
    <div className="">
      {/* <div className="z-4 rounded-md fixed top-2 left-0 px-2 w-full flex items-center gap-2">
        <SearchInputCiudad />
        <button className="text-primary">
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div> */}

      <DrawerNoSSR
        expanded={mostrarTarjeta}
        header={<></>}
        onChange={() => setMostrarTarjeta(!mostrarTarjeta)}
      >
        <TarjetaFutbolinMapa selectedMarker={selectedMarker} />
      </DrawerNoSSR>
      <Mapa
        markers={markers}
        onSelectMarker={handleSelectMarker}
        selectedMarker={selectedMarker}
      />
    </div>
  );
};
