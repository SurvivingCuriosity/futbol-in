"use client";

import { CrearLigaProvider } from "@/client/features/Competiciones/Ligas/CrearLiga/context/CrearLigaContext";
import { CrearLigaPage } from "@/client/features/Competiciones/Ligas/CrearLiga/CrearLigaPage";

const page = () => {
  return (
    <CrearLigaProvider>
      <CrearLigaPage />
    </CrearLigaProvider>
  );
};

export default page;
