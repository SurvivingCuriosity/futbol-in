import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { TarjetaCompeticion } from "./TarjetaTorneo";

const ListaTorneos = async () => {
  const competiciones = await CompeticionesService.getAll();

  return (
    <ul className="flex flex-col gap-2 max-h-[500px] overflow-y-auto my-2">
      {competiciones.map((c) => (
        <TarjetaCompeticion key={c.id} competicion={c} />
      ))}
    </ul>
  );
};

export default ListaTorneos;
