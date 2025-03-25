"use client";
import React from "react";
import { TablaClasificacionLiga } from "./TablaClasificacionLiga";

export const ClasificacionLigaPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-extrabold text-primary mb-2">Clasificación Liga</h1>
      <TablaClasificacionLiga />
    </div>
  );
};
