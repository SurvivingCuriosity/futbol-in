"use client";
import React, { useState } from "react";
import { Button } from "futbol-in-ui";
import PlacesAutocompleteInput from "@/components/PlacesAutocompleteInput";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { FormField, FormLabel } from "@/components/FormField";

const AgregarFutbolinPage = () => {
  const [selected, setSelected] = useState<IMapItem | null>(null);
  const [loading, setLoading] = useState(false);

    const [noEncuentraElBar, setNoEncuentraElBar] = useState(false);

  const handleAgregarFutbolin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/agregar-futbolin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      const data = await res.json();
      setLoading(false);
      console.log("Futbolín agregado:", data);
    } catch (error) {
      console.error("Error al agregar futbolín:", error);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto w-full p-4 border border-neutral-700 rounded-lg flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Agregar un nuevo futbolín
        </h1>
        <p className="text-neutral-400 text-sm mb-8 bg-neutral-900 p-4 rounded-lg">
          Rellena el formulario para agregar un nuevo futbolín a la aplicación.
          Los campos marcados con un asterisco (*) son obligarios. Asegurate de
          que la información introducida es correcta. Gracias por tu aportación.
        </p>
        <FormField>
          <FormLabel>Nombre del bar/sala de juegos etc. *</FormLabel>
          <PlacesAutocompleteInput onSelect={(sel) => setSelected(sel)} disabled={noEncuentraElBar} />
        </FormField>

        <label className="flex items-center text-xs text-neutral-400">
          <input type="checkbox" className="mr-2 size-4 accent-primary" checked={noEncuentraElBar} onChange={(e) => setNoEncuentraElBar(e.target.checked)} />
          No aparece el bar que busco
        </label>

        <FormField>
          <FormLabel>Dirección</FormLabel>
          <PlacesAutocompleteInput
            onSelect={(sel) => setSelected(sel)}
            disabled={!noEncuentraElBar}
          />
        </FormField>

        <div className="flex flex-row items-center gap-2 w-full flex-wrap">
          <FormField>
            <FormLabel>Tipo de futbolín *</FormLabel>
            <PlacesAutocompleteInput
              onSelect={(sel) => setSelected(sel)}
              disabled
            />
          </FormField>
          <FormField>
            <FormLabel>Dirección</FormLabel>
            <PlacesAutocompleteInput
              onSelect={(sel) => setSelected(sel)}
              disabled
            />
          </FormField>
        </div>

        <FormField>
          <FormLabel>Comentarios</FormLabel>
          <textarea
            className="w-full h-24 max-h-48 min-h-16 p-2 border border-neutral-700 rounded-lg text-sm"
            placeholder="Puedes indicar aquí el bar en el que se encuentra el futbolín si no lo encontraste en el buscador. También cualquier otra información que consideres relevante para el resto de usuarios."
          />
        </FormField>

        <Button
          label="Agregar"
          onClick={handleAgregarFutbolin}
          loading={loading}
        />
      </div>
    </>
  );
};

export default AgregarFutbolinPage;
