"use client"
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button, TextInput } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { use, useState } from "react";
import { CrearTorneoContext } from "../context/CrearTorneoContext";
export const DatosBasicos = ({
  onCompleted,
}: {
  onCompleted: (datos: unknown) => void;
}) => {

  const {tipoDeCompeticion, tipoDeFutbolin} = use(CrearTorneoContext)

  const [datosBasicos, setDatosBasicos] = useState({
    nombre: "",
    descripcion: "",
  });

  const updateField = (field: keyof typeof datosBasicos, value: string) => {
    setDatosBasicos({ ...datosBasicos, [field]: value });
  };

  const handleSiguiente = () => {
    onCompleted(datosBasicos);
  };

  const SearchInputBar = dynamic(
    () => import("@/client/shared/components/SearchInputBar"),
    { ssr: false }
  );


  return (
    <>
        <p className="mb-2 text-xs text-neutral-600">
          Todos estos campos son obligatorios
        </p>
        <FormField>
          <FormLabel>Nombre de la competición *</FormLabel>
          <TextInput
            value={datosBasicos.nombre}
            onChangeText={(t) => updateField("nombre", t)}
            placeholder={`${tipoDeCompeticion} ${tipoDeFutbolin}`}
          />
        </FormField>
        <FormField>
          <FormLabel>Descripción * </FormLabel>
          <TextInput
            value={datosBasicos.descripcion}
            onChangeText={(t) => updateField("descripcion", t)}
            placeholder="Escribe aquí una descripción breve de la competición"
          />
        </FormField>
        <FormField>
          <FormLabel>Nombre del bar/sala de juegos etc. *</FormLabel>
          <SearchInputBar
            onSelect={(sel) => {
              console.log(sel)
            }}
          />
        </FormField>
        <Button
          label="Siguiente"
          onClick={handleSiguiente}
          disabled={
            datosBasicos.nombre === "" || datosBasicos.descripcion === ""
          }
        />
    </>
  );
};
