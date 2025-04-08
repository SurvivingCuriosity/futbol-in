import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";
import { TarjetaTorneo } from "../TarjetaTorneo";

const ListaTorneos = async () => {
  const torneos = await TorneosService.getAll();

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto my-2 pr-2 h-[500px]">
      {torneos && torneos.length > 0 ? (
        torneos.map((c) => <TarjetaTorneo key={c.id} competicion={c} />)
      ) : (
        <p className="text-neutral-500 p-20">
          No hay nigún torneo disponible por ahora
        </p>
      )}
  </ul>
  );
};

export default ListaTorneos;


