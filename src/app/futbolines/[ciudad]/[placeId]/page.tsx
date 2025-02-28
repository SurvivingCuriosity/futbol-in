import ListaFutbolines from "@/features/FutbolinesCiudad/ListaFutbolines";
import { getFutbolinesByPlaceId } from "@/shared/services/Places/getFubolinesByPlaceId";

// 1) Decimos a Next que revalide cada X segundos (ISR)
export const revalidate = 3600; // 1 hora

// 2) Generar metadatos dinámicos (opcional, para SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { ciudad } = await params;
  const ciudadCapitalizada = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

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

// 3) Página principal: capturamos los params sin Promise
export default async function Page({
  params,
}: {
  params: Promise<{ ciudad: string; placeId: string }>;
}) {
  const { placeId } = await params;

  // Hacemos la query en el servidor
  const futbolines = await getFutbolinesByPlaceId(placeId);

  return (
    <>
      <ListaFutbolines futbolines={futbolines} />
    </>
  );
}
