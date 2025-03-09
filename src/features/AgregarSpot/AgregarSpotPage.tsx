"use client";

import { SpotsClient } from "@/shared/client/SpotsClient";
import { FormField, FormLabel } from "@/shared/components/FormField";
import SearchInputBar from "@/shared/components/SearchInputBar";
import SearchInputDireccion from "@/shared/components/SearchInputDireccion";
import { SelectorTipoFutbolin } from "@/shared/components/SelectorTipoFutbolin";
import { SelectorTipoLugar } from "@/shared/components/SelectorTipoLugar";
import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AgregarSpotPage = () => {

  const router = useRouter();

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

    try {
      await SpotsClient.agregarSpot({
        nombre: direccionOBar?.nombre || "Desconocido",
        direccion: direccionOBar?.direccion || "Desconocido",
        coordinates: [direccionOBar?.lng || 0, direccionOBar?.lat || 0],
        googlePlaceId: direccionOBar?.googlePlaceId || "Desconocido",
        tipoLugar,
        tipoFutbolin,
        comentarios,
      });
      setLoading(false);
      toast.success("¡Agregado correctamente!");
      router.push("/");
    } catch (error) {
      toast.error("Ups... Algo salió mal");
      setLoading(false);
      console.error("Error al agregar spot:", error);
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
              setDireccionOBar(sel);
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

export default AgregarSpotPage;
