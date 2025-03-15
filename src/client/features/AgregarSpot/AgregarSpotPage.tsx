"use client";

import { SpotsClient } from "@/client/shared/client/SpotsClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import SearchInputBar from "@/client/shared/components/SearchInputBar";
import SearchInputDireccion from "@/client/shared/components/SearchInputDireccion";
import { SelectorTipoFutbolin } from "@/client/shared/components/SelectorTipoFutbolin";
import { SelectorTipoLugar } from "@/client/shared/components/SelectorTipoLugar";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TipoLogroEnum } from "@/core/enum/Logros/TipoLogroEnum";
import { TipoLugar } from "@/core/enum/Lugares/TipoLugar";
import { useComprobarSiObtieneLogro } from "@/client/shared/hooks/useComprobarSiObtieneLogro";
import { IMapItem } from "@/core/types/MapItem/IMapItem";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { Button } from "futbol-in-ui";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { EnhorabuenaNuevaMedalla } from "../Logros/EnhorabuenaNuevaMedalla";

const AgregarSpotPage = () => {

  const session = useSession();

  const { nuevoLogro, comprobarSiGanaMedalla } = useComprobarSiObtieneLogro(
    TipoLogroEnum.AGREGAR_SPOTS
  );

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
      if (!session.data?.user?.id) {
        throw new Error("Error al obtener sesión de usuario");
      }
      const res = await SpotsClient.agregarSpot({
        nombre: direccionOBar?.nombre || "",
        direccion: direccionOBar?.direccion || "",
        coordinates: [direccionOBar?.lng || 0, direccionOBar?.lat || 0],
        googlePlaceId: direccionOBar?.googlePlaceId || "",
        tipoLugar,
        tipoFutbolin,
        comentarios,
      });
      toast.success("¡Agregado correctamente!");
      comprobarSiGanaMedalla(res.spotsCreados);
      setLoading(false);
    } catch (error) {
      toast.error(`Ups... ${getErrorMessage(error)}`);
      setLoading(false);
      console.error("Error al agregar spot:", error);
    }
  };

  return (
    <>
      {nuevoLogro && (
        <EnhorabuenaNuevaMedalla
        nuevoLogro={nuevoLogro}
        />
      )}
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
