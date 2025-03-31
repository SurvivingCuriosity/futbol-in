"use client";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { CustomSelect } from "futbol-in-ui";
import { memo } from "react";

export interface SelectorTipoFutbolinProps {
  value: TipoFutbolin;
  onSelect: (selectedOption: TipoFutbolin) => void;
  disabled?: boolean;
  incluirOpcionTodos?: boolean;
}

const SelectorTipoFutbolin = memo((props: SelectorTipoFutbolinProps) => {
  const {
    value,
    onSelect,
    disabled = false,
    incluirOpcionTodos = false,
  } = props;

  const futbolinOptions = [
    { value: TipoFutbolin.TSUNAMI, label: "Tsunami" },
    { value: TipoFutbolin.INFINITY, label: "Infinity" },
    { value: TipoFutbolin.PRESAS, label: "Presas 2000" },
    { value: TipoFutbolin.PRESAS_EVO, label: "Presas Evo" },
    { value: TipoFutbolin.DESCONOCIDO, label: "Desconocido" },
    { value: TipoFutbolin.MADERA, label: "De madera" },
  ];

  const options = incluirOpcionTodos
    ? [
        { value: TipoFutbolin.CUALQUIERA, label: "Cualquiera" },
        ...futbolinOptions,
      ]
    : futbolinOptions;

  return (
    <CustomSelect
      value={options.find((o) => o.value === value)}
      onSelect={(selectedOption) => {
        onSelect(selectedOption.value);
      }}
      options={options}
      disabled={disabled}
    />
  );
});

SelectorTipoFutbolin.displayName = "SelectorTipoFutbolin";

export default SelectorTipoFutbolin;
