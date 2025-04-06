"use client";

import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useState } from "react";
import { TarjetaModalidadDeJuego } from "./TarjetaModalidadDeJuego";

export const ModalidadDeJuego = ({
  onCompleted,
}: {
  onCompleted: (f: TipoFutbolin, m:ModalidadJuego) => void;
}) => {
  const [modalidadDeJuego, setModalidadDeJuego] = useState<ModalidadJuego>(
    ModalidadJuego.MOVIMIENTO
  );
  const [tipoFutbolin, setTipoFubtolin] = useState<TipoFutbolin>(TipoFutbolin.TSUNAMI)

  const handleSiguiente = () => {
    onCompleted(tipoFutbolin, modalidadDeJuego);
  };

  const SelectorTipoFutbolin = dynamic(
    () => import("@/client/shared/components/SelectorTipoFutbolin"),
    { ssr: false }
  );

  return (
    <>
      <div>
        <FormField>
          <FormLabel>Futbolin</FormLabel>
          <SelectorTipoFutbolin onSelect={setTipoFubtolin} value={tipoFutbolin}/>
        </FormField>

        <div className="space-y-2">
          {(Object.values(ModalidadJuego) as ModalidadJuego[]).map(
            (tipo) => (
              <TarjetaModalidadDeJuego
                key={tipo}
                modalidadDeJuego={tipo}
                selected={modalidadDeJuego === tipo}
                onSelect={setModalidadDeJuego}
              />
            )
          )}
        </div>
      </div>

      <Button label="Siguiente" onClick={handleSiguiente} />
    </>
  );
};
