
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import LinkCrearCompeticion from "../../common/LinkCrearCompeticion";
import ListaLigas from "../ListaLigas";

export const ListaLigasPage = () => {

  return (
    <GoBackLayout href="/competitivo" className="max-w-xl mx-auto h-full">
      <LinkCrearCompeticion tipoCompeticion={TipoCompeticion.LIGA} />
      <h1 className="text-2xl font-extrabold text-primary mb-2">
        Ligas cerca de ti
      </h1>
      <ListaLigas /> 
    </GoBackLayout>
  );
};
