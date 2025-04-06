
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import LinkCrearCompeticion from "../common/LinkCrearCompeticion";
import ListaTorneos from "./ListaCompeticion/ListaTorneos";

export const ListaTorneosPage = () => {

  return (
    <GoBackLayout href="/competitivo" className="max-w-xl mx-auto h-full">
      <LinkCrearCompeticion tipoCompeticion={TipoCompeticion.TORNEO} />
      <h1 className="text-2xl font-extrabold text-primary mb-2">
        Torneos cerca de ti
      </h1>
      <ListaTorneos /> 
    </GoBackLayout>
  );
};
