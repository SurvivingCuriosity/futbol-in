"use client"

import { LigaDTO } from "futbol-in-core/types";
import { TarjetaLiga } from "../TarjetaLiga";

const ListaLigas = ({ligas}:{ligas:LigaDTO[]}) => {

  return (
    <ul className="flex flex-col gap-4 overflow-y-auto my-2 pr-2 h-[calc(100dvh-13em)]">
      {ligas && ligas.length > 0 ? (
        ligas.map((c) => <TarjetaLiga key={c.id} liga={c} />)
      ) : (
        <p className="text-neutral-500 p-20">
          No hay ninguna liga disponible por ahora
        </p>
      )}
    </ul>
  );
};

export default ListaLigas;
