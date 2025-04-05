"use client";

import { CompeticionesClient } from "@/client/shared/client/CompeticionesClient";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { Button } from "futbol-in-ui";
import React from "react";
import { toast } from "react-toastify";

export const BotonesAceptarInscripcion = ({
  estadoEquipo,
  idCompeticion,
  idEquipo,
}: {
  estadoEquipo: EstadoEquipoCompeticion;
  idCompeticion: string;
  idEquipo: string;
}) => {
  const handleInscribir = async (aceptado: boolean) => {
    const res = await CompeticionesClient.responderInscripcion({
      idCompeticion,
      idEquipo,
      aceptado,
    });
    if (res.success) {
      toast.success("Nuevo equipo en la competición !");
    } else {
      toast.error("Ups... hubo algún error");
    }
  };

  return (
    estadoEquipo === EstadoEquipoCompeticion.PENDIENTE && (
      <div className="flex w-full items-center gap-2 mt-2">
        <Button
          label="Rechazar"
          onClick={() => handleInscribir(false)}
          size="sm"
          variant="neutral-outline"
        />
        <Button
          label="Aceptar"
          onClick={() => handleInscribir(true)}
          size="sm"
          variant="outline"
        />
      </div>
    )
  );
};
