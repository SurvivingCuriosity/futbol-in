import React, { useState } from "react";
import { BotonBuscarPartida } from "./BotonBuscarPartida";
import { Loader } from "./Loader";
import { ListaPartidosDisponibles } from "./ListaPartidosDisponibles";

export const Matchmaking = () => {
  const [searching, setSearching] = useState(false);

  return (
    <div className="">
      <p className="text-primary text-lg mb-2 font-bold">Matchmaking</p>
      <div className="p-4 flex items-center justify-center w-full">
        {searching ? (
          <Loader onCancel={() => setSearching(false)} />
        ) : (
          <BotonBuscarPartida onClick={() => setSearching(true)} />
        )}
      </div>

      <hr className="my-4 text-neutral-800" />

      <ListaPartidosDisponibles />
    </div>
  );
};
