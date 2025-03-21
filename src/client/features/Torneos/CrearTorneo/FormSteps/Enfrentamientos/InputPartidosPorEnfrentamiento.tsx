import { FormField, FormLabel } from "@/packages/components/FormField";
import { InlinePicker, TextInput } from "futbol-in-ui";
import { useState } from "react";

const OPCIONES_CANTIDAD_PARTIDOS = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "Otro" },
];


export interface InputPartidosPorEnfrentamientoProps {
  label?: string
  value:number;
  onUpdateValue:(value:number)=>void;
  inline?:boolean
}

export const InputPartidosPorEnfrentamiento = (props:InputPartidosPorEnfrentamientoProps) => {

    const DEFAULT_VALUE = 1;

    const { label = "Partidos por enfrentamiento", value, onUpdateValue, inline } = props

    const [customCantidadPartidos, setCustomCantidadPartidos] = useState(false);

    const handleTabSelect = (o:number) => {
        if(o === 5){
            onUpdateValue(DEFAULT_VALUE)
            setCustomCantidadPartidos(true)
        }else{
            onUpdateValue(o)
            setCustomCantidadPartidos(false)
        }
    }

  return (
    <FormField inline={inline}>
      <FormLabel>{label}</FormLabel>
      <InlinePicker
        onTabClick={handleTabSelect}
        options={OPCIONES_CANTIDAD_PARTIDOS}
      />
      {customCantidadPartidos && (
        <TextInput
          value={String(value)}
          onChangeText={(t) => onUpdateValue(Number(t) || 0)}
          placeholder="Cantidad de partidos por enfrentamiento"
        />
      )}
    </FormField>
  );
};
