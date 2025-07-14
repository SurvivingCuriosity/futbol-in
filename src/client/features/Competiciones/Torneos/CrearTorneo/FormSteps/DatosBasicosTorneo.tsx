"use client"
import SearchInputBar, { PlaceOption } from "@/client/shared/components/SearchInputBar";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button, InlinePicker, TextInput } from "futbol-in-ui";
import { use, useState } from "react";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
import { CrearTorneoContext } from "../context/CrearTorneoContext";
import { TipoInscripcion } from "futbol-in-core/enum";
export const DatosBasicosTorneo = ({
  onCompleted,
}: {
  onCompleted: (datos: ConfiguracionBasica) => void;
}) => {

  const {tipoDeFutbolin, handleCrearTorneo} = use(CrearTorneoContext)

  const [datosBasicos, setDatosBasicos] = useState<ConfiguracionBasica>({
    nombre: "",
    descripcion: "",
    googlePlaceId: "",
    tipoInscripcion: TipoInscripcion.ABIERTO,
    ciudad: ""
  });

  const [barSeleccionado, setBarSeleccionado] = useState<PlaceOption|undefined>()
  
  const updateField = (field: keyof typeof datosBasicos, value: string|TipoInscripcion) => {
    setDatosBasicos({ ...datosBasicos, [field]: value });
  };

  const handleSiguiente = () => {
    onCompleted(datosBasicos);
    handleCrearTorneo()
  };

  const opcionesTipoInscripcion = [
    { id: 0, label: TipoInscripcion.ABIERTO },
    { id: 1, label: TipoInscripcion.SEMIABIERTO },
    { id: 2, label: TipoInscripcion.CERRADO },
  ];

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
            placeholder={`Torneo ${tipoDeFutbolin}`}
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
            value={barSeleccionado}
            onSelect={(sel) => {
              setDatosBasicos((prev) => ({...prev, googlePlaceId: sel.googlePlaceId}))
            }}
            onSelectPlaceOption={setBarSeleccionado}
          />
        </FormField>
        <FormField>
          <FormLabel>Tipo de inscripción</FormLabel>
          <InlinePicker 
            options={opcionesTipoInscripcion}
            onTabClick={(id) => {
              const opcionSeleccionada = opcionesTipoInscripcion.find((o) => o.id === id);
              if (opcionSeleccionada) {
                updateField("tipoInscripcion", opcionSeleccionada.label)
              } else {
                updateField("tipoInscripcion", TipoInscripcion.ABIERTO)
              }
            }}
            size="sm"
          />
        </FormField>
        <TarjetaMensaje 
          text={
            datosBasicos.tipoInscripcion === TipoInscripcion.ABIERTO 
            ? "Cualquier persona podrá inscribirse a la competición" 
            : datosBasicos.tipoInscripcion === TipoInscripcion.SEMIABIERTO 
            ? "Cualquier persona podrá inscribirse a la competición, pero estos deberán ser aprobados por ti." : "Solo tú podrás agregar equipos a la competición"
          }
          variant="info"
        />
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
