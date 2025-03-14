// hooks/useUserLocation.ts
import { useEffect, useState } from "react";

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("La geolocalización no es soportada en este navegador.");
      return;
    }
    
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation((prev) => {
          // Solo actualiza el state si realmente cambia la posición
          if (
            !prev ||
            prev.lat !== latitude ||
            prev.lng !== longitude
          ) {
            return { lat: latitude, lng: longitude };
          }
          return prev;
        });
      },
      (err) => {
        console.error("Error obteniendo la ubicación del usuario:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return userLocation;
}
