import { SpotsCiudadPage } from "@/features/SpotsCiudad/SpotsCiudadPage";
import { SpotService } from "@/shared/services/Spots/SpotsService";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { ciudad } = await params;
  const ciudadCapitalizada = decodeURIComponent(ciudad.charAt(0).toUpperCase() + ciudad.slice(1));

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
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { placeId, ciudad } = await params;

  const spots = await SpotService.findNearbyByPlaceId(placeId);
  const nombreCiudad = decodeURIComponent(ciudad.charAt(0).toUpperCase() + ciudad.slice(1));

  return <SpotsCiudadPage spots={spots}  nombreCiudad={nombreCiudad}/>;
}
