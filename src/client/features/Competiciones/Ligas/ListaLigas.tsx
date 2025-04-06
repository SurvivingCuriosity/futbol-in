import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { TarjetaLiga } from "./TarjetaLiga";

const ListaLigas = async () => {
  const ligas = await LigasService.getAll();

  return (
       <ul className="flex flex-col gap-4 overflow-y-auto my-2 pr-2 h-[500px]">
         {ligas.map((c) => (
           <TarjetaLiga key={c.id} competicion={c} />
         ))}
       </ul>
  );
};

export default ListaLigas;


