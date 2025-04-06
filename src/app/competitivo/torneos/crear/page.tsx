"use client";

import { CrearTorneoProvider } from "@/client/features/Competiciones/Torneos/CrearTorneo/context/CrearTorneoContext";
import { CrearTorneoPage } from "@/client/features/Competiciones/Torneos/CrearTorneo/CrearTorneoPage";


const page = () => {
  return (
    <CrearTorneoProvider>
      <CrearTorneoPage />
    </CrearTorneoProvider>
  );
};

export default page;
