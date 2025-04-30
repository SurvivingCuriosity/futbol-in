import { SpotsCiudadPage } from "@/client/features/Spots/SpotsCiudadPage";
import { decodeCiudad } from "@/core/helpers/encodeCiudad";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";

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

  const coords = await GoogleMapsService.getCoordinatesFromCiudad(
    ciudadParaBusqueda
  );

  const idsOperadoresSet = new Set(spots.map((s) => s.idOperador));

  const idsOperadores: string[] = [...idsOperadoresSet].filter(
    (id): id is string => id !== null
  );

  const operadores = await UserService.getPerfilesOperadores(idsOperadores);
  const operadoresMapeados = operadores.map(UserService.mapOperadorToDTO);

  return <SpotsCiudadPage spots={spots} coords={coords} ciudad={ciudad} operadores={operadoresMapeados}/>;
}

export interface FullPlace {
  ciudad: string;
  coords: google.maps.LatLngLiteral;
  placeId: string;
}
