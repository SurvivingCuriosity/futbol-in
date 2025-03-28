import React from "react";
import { TarjetaCompletarPerfil } from "./TarjetaCompletarPerfil";

export const CompletarPerfil = () => {
  return (
    <div className="p-3 bg-neutral-900 rounded-lg">
      <p>{`Completa tu perfil`}</p>
      <ul className="flex space-x-2 overflow-x-auto m-2 pb-2 snap-x snap-mandatory">
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
        <TarjetaCompletarPerfil>
          <>
            <p>Paso 1</p>
            <p>Lorem ipsum blablabla</p>
          </>
        </TarjetaCompletarPerfil>
      </ul>
    </div>
  );
};
