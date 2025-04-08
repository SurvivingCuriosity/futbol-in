import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { TarjetaLiga } from "./TarjetaLiga";

const ListaLigas = async () => {
  const ligas = await LigasService.getAll();

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto my-2 pr-2 h-[500px]">
      {ligas && ligas.length > 0 ? (
        ligas.map((c) => <TarjetaLiga key={c.id} competicion={c} />)
      ) : (
        <p className="text-neutral-500 p-20">
          No hay ninguna liga disponible por ahora
        </p>
      )}
    </ul>
  );
};

export default ListaLigas;
