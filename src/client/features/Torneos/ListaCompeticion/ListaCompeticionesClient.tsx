import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { TarjetaCompeticion } from "./TarjetaCompeticion";

export const ListaCompeticionesClient = ({
  competiciones,
}: {
  competiciones: CompeticionDTO[];
}) => {

  // const tipoCompeticionEnum =TipoCompeticion.LIGA

//   const competicionesFiltradas = useMemo(
//     () =>
//       competiciones.filter((c) => c.tipoDeCompeticion === tipoCompeticionEnum),
//     [competiciones, tipoCompeticionEnum]
//   );

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto my-2 pr-2 h-[500px]">
      {competiciones.map((c) => (
        <TarjetaCompeticion key={c.id} competicion={c} />
      ))}
    </ul>
  );
};
