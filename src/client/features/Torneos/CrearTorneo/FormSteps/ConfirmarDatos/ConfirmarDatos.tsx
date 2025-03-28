import { use } from "react";
import { CrearTorneoContext } from "../../context/CrearTorneoContext";
import { CompeticionesClient } from "@/client/shared/client/CompeticionesClient";
import { Button } from "futbol-in-ui";

export const ConfirmarDatos = () => {
  
  const { competicionEnCreacion } = use(CrearTorneoContext);
  

  const handleCrearCompeticion = async () => {
    if(competicionEnCreacion === undefined) return;
    await CompeticionesClient.crearCompeticion(competicionEnCreacion);
  }

  return (
    <div>
      <pre>{JSON.stringify(competicionEnCreacion, null, 2)}</pre>
      <Button 
        label="Crear competicion"
        onClick={handleCrearCompeticion}
      />
    </div>
  );
};
