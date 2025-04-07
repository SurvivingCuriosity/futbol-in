"use client";
import React from "react";
import { TablaClasificacionLiga } from "./TablaClasificacionLiga";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";

export const ClasificacionLigaPage = ({equipos}:{equipos:EquipoConEstadoDTO[]}) => {
  return (
    <div className="w-full">
      <TablaClasificacionLiga equipos={equipos} />
    </div>
  );
};
