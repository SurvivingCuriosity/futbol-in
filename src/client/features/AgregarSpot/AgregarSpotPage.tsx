"use client";

import { getErrorsClient } from "@/client/shared/client/errorHandler/errorHandler";
import { SpotsClient } from "@/client/shared/client/SpotsClient";
import { ErrorMessage } from "@/client/shared/components/ErrorMessage";
import SearchInputBar from "@/client/shared/components/SearchInputBar";
import SearchInputDireccion from "@/client/shared/components/SearchInputDireccion";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import SelectorDistribucionFutbolin from "@/client/shared/components/SelectorDistribucionFutbolin";
import SelectorTipoFutbolin from "@/client/shared/components/SelectorTipoFutbolin";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { useComprobarSiObtieneLogro } from "@/client/shared/hooks/useComprobarSiObtieneLogro";
import { DistribucionFutbolin } from "@/core/enum/Futbolin/DistribucionFutbolin";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TipoLogroEnum } from "@/core/enum/Logros/TipoLogroEnum";
import { TipoLugar } from "@/core/enum/Lugares/TipoLugar";
import { decodeCiudad } from "@/core/helpers/encodeCiudad";
import { IMapItem } from "@/core/types/MapItem/IMapItem";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button } from "futbol-in-ui";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { EnhorabuenaNuevaMedalla } from "../Logros/EnhorabuenaNuevaMedalla";

const AgregarSpotPage = () => {
  const session = useSession();

  const params = useSearchParams();
  const ciudadParam = params.get("ciudad");

  const { nuevoLogro, comprobarSiGanaMedalla } = useComprobarSiObtieneLogro(
    TipoLogroEnum.AGREGAR_SPOTS
  );

  const [ciudad, setCiudad] = useState<string>(
    decodeCiudad(ciudadParam || "") || ""
  );
  const [direccionOBar, setDireccionOBar] = useState<Pick<
    IMapItem,
    "direccion" | "nombre" | "lat" | "lng" | "googlePlaceId"
  > | null>(null);

  const [tipoFutbolin, setTipoFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );

  const [distribucion, setDistribucion] = useState<DistribucionFutbolin>(
    DistribucionFutbolin.F4
  );

  const [comentarios, setComentarios] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string> | undefined>(
    undefined
  );

  const [noEncuentraElBar, setNoEncuentraElBar] = useState(false);

  const handleSetCiudad = (selected: string) => {
    const ciudadesF5 = ["Murcia", "Valencia", "Alicante/Alacant", "Castellón"];
    if (ciudadesF5.includes(selected.split(",")[1].trim())) {
      setDistribucion(DistribucionFutbolin.F5);
    } else {
      setDistribucion(DistribucionFutbolin.F4);
    }
    setCiudad(selected);
  };

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
        ciudad,
        googlePlaceId: direccionOBar?.googlePlaceId || "",
        tipoLugar: TipoLugar.FUBTOLIN,
        tipoFutbolin,
        comentarios,
        distribucion,
      });
      toast.success("¡Agregado correctamente!");
      comprobarSiGanaMedalla(res.spotsCreados);
      setLoading(false);
    } catch (error) {
      const errores = getErrorsClient(error);
      if(errores && 'futbolin' in errores){
        toast.error(errores['futbolin'])
      }
      setErrors(getErrorsClient(error));
      setLoading(false);
    }
  };

  return (
    <>
      {nuevoLogro && <EnhorabuenaNuevaMedalla nuevoLogro={nuevoLogro} />}
      <div className="max-w-xl mx-auto w-full md:p-4 md:border border-neutral-700 rounded-lg flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary">
          Agregar un nuevo futbolín
        </h1>
        <p className="text-neutral-400 text-xs md:mb-8 bg-neutral-900 p-2 rounded-lg text-balance">
          Asegurate de que la información introducida es correcta. Gracias por
          tu aportación.
        </p>

        <FormField>
          <FormLabel>Ciudad</FormLabel>
          <SearchInputMunicipios
            onSelect={handleSetCiudad}
            value={decodeCiudad(ciudadParam || "") || ""}
          />
          {errors && errors["ciudad"] && (
            <ErrorMessage message={errors["ciudad"]} />
          )}
        </FormField>

        {!noEncuentraElBar ? (
          <>
            <FormField>
              <FormLabel>Nombre del bar/sala de juegos etc. *</FormLabel>
              <SearchInputBar
                ciudad={ciudad}
                onSelect={(sel) => {
                  setDireccionOBar(sel);
                }}
                disabled={noEncuentraElBar}
                placeholder="Busca el bar.."
              />
              {errors && errors["nombre"] && (
                <ErrorMessage message={errors["nombre"]} />
              )}
            </FormField>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <TarjetaMensaje
              variant="info"
              text="Asegúrate de incluir el número"
            />
            <FormField className="mb-0">
              <FormLabel>Dirección</FormLabel>
              <SearchInputDireccion
                onSelect={(sel) => setDireccionOBar(sel)}
                disabled={!noEncuentraElBar}
                placeholder="Introduce dirección"
              />
              {errors && errors["nombre"] && (
                <ErrorMessage message={errors["nombre"]} />
              )}
            </FormField>
          </div>
        )}

        <label className="flex items-center text-xs text-neutral-400">
          <input
            type="checkbox"
            className="mr-2 size-4 accent-primary"
            checked={noEncuentraElBar}
            onChange={(e) => setNoEncuentraElBar(e.target.checked)}
          />
          No aparece el bar que busco
        </label>

        <div className="grid grid-cols-3 gap-2">
          <FormField className="col-span-2">
            <FormLabel>Tipo de futbolín *</FormLabel>
            <SelectorTipoFutbolin
              onSelect={setTipoFutbolin}
              value={tipoFutbolin}
            />
          </FormField>
          <FormField>
            <FormLabel>Distrubucion *</FormLabel>
            <SelectorDistribucionFutbolin
              onSelect={setDistribucion}
              value={distribucion}
            />
          </FormField>
        </div>

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
