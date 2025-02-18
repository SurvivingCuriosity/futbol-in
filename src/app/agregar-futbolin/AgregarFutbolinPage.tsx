// src/app/agregar-futbolin/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "futbol-in-ui";
import PlacesAutocompleteInput from "@/components/PlacesAutocompleteInput";
import { IMapItem } from "@/types/MapItem/IMapItem";

const AgregarFutbolinPage = () => {
  const [selected, setSelected] = useState<IMapItem|null>(null);

  const handleAgregarFutbolin = async () => {
    try {
      const res = await fetch("/api/agregar-futbolin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      const data = await res.json();
      console.log("Futbolín agregado:", data);
    } catch (error) {
      console.error("Error al agregar futbolín:", error);
    }
  };

  return (
    <div>
      <PlacesAutocompleteInput onSelect={(sel) => setSelected(sel)} />
      <pre>{JSON.stringify(selected, null, 2)}</pre>
      <Button label="Agregar" onClick={handleAgregarFutbolin} />
    </div>
  );
};

export default AgregarFutbolinPage;
