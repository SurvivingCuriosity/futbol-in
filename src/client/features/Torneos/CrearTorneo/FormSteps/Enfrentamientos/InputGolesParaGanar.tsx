import { FormField, FormLabel } from "@/packages/components/FormField";
import { InlinePicker, TextInput } from "futbol-in-ui";
import { useState } from "react";

const OPCIONES_GOLES_PARA_GANAR = [
  { id: 5, label: "5" },
  { id: 7, label: "7" },
  { id: 9, label: "9" },
  { id: 10, label: "10" },
  { id: 11, label: "Otro" },
];

export interface InputGolesParaGanarProps {
  label?: string;
  value: number;
  onUpdateValue: (value: number) => void;
  inline?:boolean;
}

export const InputGolesParaGanar = (props: InputGolesParaGanarProps) => {
  const DEFAULT_VALUE = 10;

  const { label = "Goles para ganar el partido", value, onUpdateValue, inline = false } = props;

  const [customCantidadPartidos, setCustomCantidadPartidos] = useState(false);

  const handleTabSelect = (o: number) => {
    if (o === 11) {
      onUpdateValue(DEFAULT_VALUE);
      setCustomCantidadPartidos(true);
    } else {
      onUpdateValue(o);
      setCustomCantidadPartidos(false);
    }
  };

  return (
    <FormField inline={inline}>
      <FormLabel>{label}</FormLabel>
      <InlinePicker
        onTabClick={handleTabSelect}
        options={OPCIONES_GOLES_PARA_GANAR}
      />
      {customCantidadPartidos && (
        <TextInput
          value={String(value)}
          onChangeText={(t) => onUpdateValue(Number(t) || 0)}
          placeholder="Cantidad de goles para ganar el partido"
        />
      )}
    </FormField>
  );
};
