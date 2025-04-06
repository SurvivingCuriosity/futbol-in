import { TorneosClient } from "@/client/shared/client/TorneosClient";
import { Button } from "futbol-in-ui";
import { use } from "react";
import { CrearTorneoContext } from "../../context/CrearTorneoContext";

export const ConfirmarDatosTorneo = () => {
  
  const { competicionEnCreacion } = use(CrearTorneoContext);
  
  const handleCrearCompeticion = async () => {
    if(competicionEnCreacion === undefined) return;
    await TorneosClient.crearTorneo(competicionEnCreacion);
  }

  return (
    <div>
      <pre>{JSON.stringify(competicionEnCreacion, null, 2)}</pre>
      <Button 
        label="Crear torneo"
        onClick={handleCrearCompeticion}
      />
    </div>
  );
};
