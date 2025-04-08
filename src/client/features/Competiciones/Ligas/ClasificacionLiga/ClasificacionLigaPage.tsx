"use client";
import { use } from "react";
import { DetalleLigaContext } from "../DetalleLiga/DetalleLigaContext";
import { TablaClasificacionLiga } from "./TablaClasificacionLiga";

export const ClasificacionLigaPage = () => {
  
  const {equipos, enfrentamientos} = use(DetalleLigaContext)

  return (
    <div className="w-full">
      <TablaClasificacionLiga equipos={equipos} enfrentamientos={enfrentamientos} />
    </div>
  );
};
