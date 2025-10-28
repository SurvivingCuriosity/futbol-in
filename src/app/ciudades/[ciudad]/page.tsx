import { SpotsCiudadPage } from "@/client/features/Spots/SpotsCiudadPage";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { decodeCiudad } from "futbol-in-core/helpers";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { ciudad } = await params;
  const ciudadCapitalizada = decodeURIComponent(ciudad.split("_")[0]);

  return {
    title: `Futbolines en ${ciudadCapitalizada}`,
    description: `Descubre los mejores futbolines en ${ciudadCapitalizada} y sus alrededores.`,
    openGraph: {
      title: `Futbolines en ${ciudadCapitalizada}`,
      description: `Aquí encontrarás los mejores futbolines en ${ciudadCapitalizada}.`,
      url: `https://futbolin.app/spots/${ciudad}`,
      images: [
        {
          url: "https://futbolin.app/favicon.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      siteName: "Futbol-in",
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad } = await params;

  const ciudadParaBusqueda = decodeCiudad(ciudad);

  const spots = await SpotService.findInCiudad(ciudadParaBusqueda);

  if (spots.length === 0) {
    return (
      <div className="p-10 max-w-md mx-auto flex flex-col items-stretch h-full">
        <p className="text-center text-neutral-400 mb-8 text-2xl">
          Ups... parece que aún no hay futbolines en esta ciudad
        </p>
        <Link
          className="bg-primary text-neutral-900 px-4 p-2 text-lg rounded-2xl w-fit mx-auto"
          href={`/agregar-spot?ciudad=${ciudad}`}
        >
          {`Añade el primero`}
        </Link>
      </div>
    );
  }

  const googleInfoSpots = await GoogleMapsService.getPlaceDetailsFromPlaceIds(
    spots.map((s) => s.googlePlaceId) || []
  );

  const coords = await GoogleMapsService.getCoordinatesFromCiudad(
    ciudadParaBusqueda
  );



  return (
    <SpotsCiudadPage
      spots={spots}
      googleInfoSpots={googleInfoSpots}
      coords={coords}
      ciudad={ciudad}
    />
  );
}

export interface FullPlace {
  ciudad: string;
  coords: google.maps.LatLngLiteral;
  placeId: string;
}
