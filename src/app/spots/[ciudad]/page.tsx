import { SpotsCiudadPage } from "@/client/features/Spots/SpotsCiudadPage";
import { decodeCiudad } from "@/core/helpers/encodeCiudad";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { SpotService } from "@/server/services/Spots/SpotsService";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { ciudad } = await params;
  const ciudadCapitalizada = decodeURIComponent(ciudad.split('_')[0]);

  return {
    title: `Futbolines en ${ciudadCapitalizada}`,
    description: `Descubre los mejores futbolines en ${ciudadCapitalizada} y sus alrededores.`,
    openGraph: {
      title: `Futbolines en ${ciudadCapitalizada}`,
      description: `Aquí encontrarás los mejores futbolines en ${ciudadCapitalizada}.`,
      url: `https://futbol-in.vercel.app/futbolines/${ciudad}`,
      images: [
        {
          url: "https://futbol-in.vercel.app/favicon.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      siteName: "Futbol-In",
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

  const ciudadParaBusqueda = decodeCiudad(ciudad)

  const spots = await SpotService.findInCiudad(ciudadParaBusqueda);
  const coords = await GoogleMapsService.getCoordinatesFromCiudad(ciudad);

  return <SpotsCiudadPage spots={spots} coords={coords} ciudad={ciudad}/>;
}


export interface FullPlace {
  ciudad: string;
  coords: google.maps.LatLngLiteral;
  placeId: string;
}