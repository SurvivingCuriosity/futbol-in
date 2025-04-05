import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { TarjetaCompeticion } from "./TarjetaTorneo";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";

const ListaTorneos = async ({tipoCompeticion}:{tipoCompeticion:TipoCompeticion}) => {
  const competiciones = await CompeticionesService.getAll();

  const competicionesFiltradas = competiciones.filter((c) => c.tipoDeCompeticion === tipoCompeticion);

  return (
    <ul className="flex flex-col gap-4 max-h-[500px] overflow-y-auto my-2 pr-2">
      {competicionesFiltradas.map((c) => (
        <TarjetaCompeticion key={c.id} competicion={c} />
      ))}
    </ul>
  );
};

export default ListaTorneos;
