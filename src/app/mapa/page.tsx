"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Page() {

    const markers = [
        {
            id: 1,
            lat: 40.4167,
            lng: -3.7033,
            iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        },
    ]

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "600px" }}
        center={{ lat: 40.4167, lng: -3.7033 }}
        zoom={6}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          rotateControl: false,
          scaleControl: false,
          zoomControl: false,
          mapId: "729d891f5d94366",
          restriction: {
            latLngBounds: {
              north: 43.79,
              south: 36.0,
              west: -9.3,
              east: 4.3,
            },
            strictBounds: false,
          },
          minZoom: 5,
        }}
      >
        {markers?.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            icon={m.iconUrl}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
