"use client";
import { FormField, FormLabel } from "@/shared/components/FormField";
import SearchInputBar from "@/shared/components/SearchInputBar";
import SearchInputDireccion from "@/shared/components/SearchInputDireccion";
import { SelectorTipoFutbolin } from "@/shared/components/SelectorTipoFutbolin";
import { SelectorTipoLugar } from "@/shared/components/SelectorTipoLugar";
import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { Button } from "futbol-in-ui";
import { useState } from "react";

const AgregarFutbolinPage = () => {
  const [direccionOBar, setDireccionOBar] = useState<Pick<
    IMapItem,
    "direccion" | "nombre" | "lat" | "lng" | "googlePlaceId"
  > | null>(null);

  const [tipoLugar, setTipoLugar] = useState<TipoLugar>(TipoLugar.FUBTOLIN);

  const [tipoFutbolin, setTipoFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );

  const [comentarios, setComentarios] = useState("");

  const [loading, setLoading] = useState(false);

  const [noEncuentraElBar, setNoEncuentraElBar] = useState(false);

  const handleAgregarFutbolin = async () => {
    setLoading(true);

    const lugar: IMapItem = {
      nombre: direccionOBar?.nombre || "Desconocido",
      direccion: direccionOBar?.direccion || "Desconocido",
      lat: direccionOBar?.lat || 0,
      lng: direccionOBar?.lng || 0,
      googlePlaceId: direccionOBar?.googlePlaceId || "Desconocido",
      tipoLugar,
      tipoFutbolin,
      comentarios,
    };

    try {
      const res = await fetch("/api/agregar-futbolin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lugar),
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
          Asegurate de que la información introducida es correcta. Gracias por
          tu aportación.
        </p>

        <FormField>
          <FormLabel>Tipo de lugar</FormLabel>
          <SelectorTipoLugar
            onSelect={setTipoLugar}
            disabled={true}
            value={tipoLugar}
          />
        </FormField>

        <FormField>
          <FormLabel>Nombre del bar/sala de juegos etc. *</FormLabel>
          <SearchInputBar
            onSelect={(sel) => {
              console.log(sel)
              setDireccionOBar(sel)
            }}
            disabled={noEncuentraElBar}
          />
        </FormField>

        <label className="flex items-center text-xs text-neutral-400">
          <input
            type="checkbox"
            className="mr-2 size-4 accent-primary"
            checked={noEncuentraElBar}
            onChange={(e) => setNoEncuentraElBar(e.target.checked)}
          />
          No aparece el bar que busco
        </label>

        <FormField>
          <FormLabel>Dirección</FormLabel>
          <SearchInputDireccion
            onSelect={(sel) => setDireccionOBar(sel)}
            disabled={!noEncuentraElBar}
          />
        </FormField>

        <FormField>
          <FormLabel>Tipo de futbolín *</FormLabel>
          <SelectorTipoFutbolin
            onSelect={setTipoFutbolin}
            value={tipoFutbolin}
          />
        </FormField>

        <FormField>
          <FormLabel>Comentarios</FormLabel>
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
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
