import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { ListaCompeticionesClient } from "./ListaCompeticionesClient";

const ListaCompeticiones = async () => {
  const competiciones = await CompeticionesService.getAll();

  return (
   <ListaCompeticionesClient competiciones={competiciones} />
  );
};

export default ListaCompeticiones;


