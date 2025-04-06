import { LigasClient } from "@/client/shared/client/LigasClient";
import { Button } from "futbol-in-ui";
import { use } from "react";
import { CrearLigaContext } from "../../context/CrearLigaContext";

export const ConfirmarDatosLiga = () => {
  const { competicionEnCreacion } = use(CrearLigaContext);

  const handleCrearCompeticion = async () => {
    if (competicionEnCreacion === undefined) return;
    await LigasClient.crearLiga(competicionEnCreacion);
  };

  return (
    <div>
      <pre>{JSON.stringify(competicionEnCreacion, null, 2)}</pre>
      <Button label="Crear competicion" onClick={handleCrearCompeticion} />
    </div>
  );
};
