
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import LinkCrearTorneo from "./LinkCrearTorneo";
import ListaCompeticiones from "./ListaCompeticion/ListaCompeticiones";

export const ListaCompeticionesPage = () => {

  return (
    <GoBackLayout href="/competitivo" className="max-w-xl mx-auto h-full">
      <LinkCrearTorneo />
      <h1 className="text-2xl font-extrabold text-primary mb-2">
        Ligas cerca de ti
      </h1>
      <ListaCompeticiones /> 
    </GoBackLayout>
  );
};
