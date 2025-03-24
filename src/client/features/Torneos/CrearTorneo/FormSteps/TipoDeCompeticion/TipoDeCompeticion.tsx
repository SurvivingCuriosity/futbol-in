"use client";

import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { Button } from "futbol-in-ui";
import { useState } from "react";
import { TarjetaTipoCompeticion } from "./components/TarjetaTipoCompeticion";

export const TipoDeCompeticion = ({
  onCompleted,
}: {
  onCompleted: (t: TipoCompeticion) => void;
}) => {
  const [tipoDeCompeticion, setTipoDeCompeticion] = useState<TipoCompeticion>(
    TipoCompeticion.LIGA
  );

  const handleSiguiente = () => {
    onCompleted(tipoDeCompeticion);
  };

  return (
    <>
      <div>
        <div className="space-y-2">
          {(Object.values(TipoCompeticion) as TipoCompeticion[]).map(
            (tipo) => (
              <TarjetaTipoCompeticion
                key={tipo}
                tipoCompeticion={tipo}
                selected={tipoDeCompeticion === tipo}
                onSelect={setTipoDeCompeticion}
              />
            )
          )}
        </div>
      </div>

      <Button label="Siguiente" onClick={handleSiguiente} />
    </>
  );
};
