"use client"

import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useState } from "react";

export const TipoDeCompeticion = ({
  onCompleted,
}: {
  onCompleted: (datos: unknown) => void;
}) => {
  const [tipoDeCompeticion, setTipoDeCompeticion] = useState({
    tipoCompeticion: TipoCompeticion.TORNEO,
    tipoFutbolin: TipoFutbolin.CUALQUIERA,
  });

  const updateField = (field: keyof typeof tipoDeCompeticion, value: string|number) => {
    setTipoDeCompeticion({ ...tipoDeCompeticion, [field]: value });
  };

  const handleSiguiente = () => {
    onCompleted(tipoDeCompeticion);
  };
  

  const SelectorTipoCompeticion = dynamic(
    () => import("@/client/features/Torneos/CrearTorneo/components/SelectorTipoCompeticion"),
    { ssr: false }
  );
  
  const SelectorTipoFutbolin = dynamic(
    () => import("@/client/shared/components/SelectorTipoFutbolin"),
    { ssr: false }
  );

  return (
    <>
      <p className="mb-2 text-xs text-neutral-600">
        Todos estos campos son obligatorios
      </p>

      <FormField>
        <FormLabel>Tipo de competición *</FormLabel>
        <SelectorTipoCompeticion
          value={tipoDeCompeticion.tipoCompeticion}
          onSelect={(selectedOption) =>
            updateField("tipoCompeticion", selectedOption)
          }
        />
      </FormField>
      <FormField>
        <FormLabel>Tipo de futbolín *</FormLabel>
        <SelectorTipoFutbolin
          value={tipoDeCompeticion.tipoFutbolin}
          onSelect={(selectedOption) =>
            updateField("tipoFutbolin", selectedOption)
          }
        />
      </FormField>

      <Button
        label="Siguiente"
        onClick={handleSiguiente}
      />
    </>
  );
};
