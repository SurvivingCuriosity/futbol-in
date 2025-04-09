import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import Link from "next/link";

const LinkCrearCompeticion = ({tipoCompeticion}:{tipoCompeticion:TipoCompeticion}) => {

  const href = tipoCompeticion === TipoCompeticion.TORNEO 
  ? "/competitivo/torneos/crear" 
  : "/competitivo/ligas/crear"

  return (<Link
    href={href}
    className="fixed bottom-16 z-2 lg:bottom-2 right-2 bg-primary border border-stone-800 text-stone-800 p-2 rounded-lg px-4 mx-auto block text-center"
  >
    Crear una competición
  </Link>);
};

export default LinkCrearCompeticion;
