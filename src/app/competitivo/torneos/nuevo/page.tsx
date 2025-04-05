"use client";

import { CrearTorneoProvider } from "@/client/features/Torneos/CrearTorneo/context/CrearTorneoContext";
import { CrearTorneoPage } from "@/client/features/Torneos/CrearTorneo/CrearTorneoPage";

const page = () => {
  return (
    <CrearTorneoProvider>
      <CrearTorneoPage />
    </CrearTorneoProvider>
  );
};

export default page;
