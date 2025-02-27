import ListaFutbolines from "@/features/FutbolinesCiudad/ListaFutbolines";
import { getFutbolinesByPlaceId } from "@/shared/services/Places/getFubolinesByPlaceId";
import { cookies } from "next/headers";

export const revalidate = 3600; // revalida cada 1 hora

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {

  const ciudad = (await params).ciudad;
  const ciudadCapitalizada = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

  return {
    title: `Futbolines en ${ciudadCapitalizada}`,
    description: `Descubre los mejores futbolines en ${ciudadCapitalizada} y sus alrededores. Busca y filtra por marca, ubicación y más.`,
    openGraph: {
      title: `Futbolines en ${ciudadCapitalizada}`,
      description: `Aquí encontrarás los mejores futbolines en ${ciudadCapitalizada}. ¡Conoce su localización y características!`,
      url: `https://futbol-in.vercel.app/futbolines/${ciudad}`,
      siteName: "Futbol-In",
      images: [
        {
          url: "https://futbol-in.vercel.app/favicon.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Futbolines en ${ciudadCapitalizada}`,
      description: `Consulta la lista completa de futbolines en ${ciudadCapitalizada}.`,
      images: ["https://futbol-in.vercel.app/favicon.png"],
    },
  };
}

const page = async () => {
  const cookiesStore = await cookies();
  const placeId = cookiesStore.get("selectedPlaceId")?.value;
  const futbolines = await getFutbolinesByPlaceId(placeId || "");

  return (
    <>
      <ListaFutbolines futbolines={futbolines} />
    </>
  );
};

export default page;
