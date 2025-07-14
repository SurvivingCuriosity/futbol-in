"use client";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoCompeticion } from "futbol-in-core/enum";
import {
  puedeCrearTorneos,
} from "futbol-in-core/helpers";
import { LigaDTO } from "futbol-in-core/types";
import { use, useState } from "react";
import LinkCrearCompeticion from "../../common/LinkCrearCompeticion";
import ListaLigas from "./ListaLigas";
import { ListaLigasContext } from "./ListaLigasContext";

export const ListaLigasPage = () => {
  const user = useGetLoggedInUserClient();
  const creaTorneos = user && puedeCrearTorneos(user);

  const {ligas} = use(ListaLigasContext)

  const [ligasFiltradas, setLigasFiltradas] = useState<LigaDTO[]>(ligas)

  const handleCheckMostrarMias = (value:boolean) => {
    if(value){
      setLigasFiltradas(ligas.filter(l => l?.createdByUserId?.toString() === user?.id.toString()))
    } else {
      setLigasFiltradas(ligas)
    }
  }

  return (
    <GoBackLayout href="/competitivo" className="max-w-xl mx-auto h-full">
      {creaTorneos && (
        <LinkCrearCompeticion tipoCompeticion={TipoCompeticion.LIGA} />
      )}
      <h1 className="text-2xl font-extrabold text-primary mb-2">
        {user?.ciudadActual ? `Ligas en ${user?.ciudadActual.split(',')[0]}` : `Ligas cerca de ti`}
      </h1>
      {user && puedeCrearTorneos(user) && (
        <label>
          <input type="checkbox" onChange={(e) => handleCheckMostrarMias(e.target.checked)} />
          Mostar solo creadas por mi
        </label>
      )}
      <ListaLigas ligas={ligasFiltradas}/>
    </GoBackLayout>
  );
};
