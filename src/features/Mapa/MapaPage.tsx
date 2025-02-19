"use client"

import { IMarker } from "@/shared/types/Marker/IMarker";
import { useEffect, useState } from "react";
import { Mapa } from "./Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "futbol-in-ui";

export const MapaPage = () => {

    const [markers, setMarkers] = useState<IMarker[]>([]);

    useEffect(() => {
        fetchFutbolines(40.9629936, -5.661232699999999);
      }, []);
    
      async function fetchFutbolines(lat: number, lng: number, maxDistance = 5000) {
        const res = await fetch(
          `/api/get-futbolines?lat=${lat}&lng=${lng}&maxDistance=${maxDistance}`
        );
        const data = await res.json();
        const markers = data.data.map((f: IMarker, index: number) => ({
          id: index,
          lat: Number(f.lat),
          lng: Number(f.lng),
          iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }));
        setMarkers(markers);
      }
      return (
        <div className="relative">
            <div className="absolute top-2 right-2 z-1 bg-neutral-800 text-primary p-4 rounded-md border">
                <span className="flex items-center gap-2">
                    <p className="text-white">Search area</p>
                    <FontAwesomeIcon icon={faFilter} />
                </span>
                <TextInput placeholder="Introduce una ciudad"/>
            </div>
            <Mapa markers={markers} />
        </div>
      )
}