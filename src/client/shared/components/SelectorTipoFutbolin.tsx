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
    { value: TipoFutbolin.TSUNAMI, label: "Tsunami", imageUrl: '/logos/tsunami.png' },
    { value: TipoFutbolin.INFINITY, label: "Infinity", imageUrl: '/logos/infinity.png' },
    { value: TipoFutbolin.PRESAS, label: "Presas 2000", imageUrl: '/logos/presas.png' },
    { value: TipoFutbolin.PRESAS_EVO, label: "Presas Evo", imageUrl: '/logos/presas_evo.png' },
    { value: TipoFutbolin.DESCONOCIDO, label: "Desconocido", imageUrl: '/logos/desconocido.png' },
    { value: TipoFutbolin.MADERA, label: "De madera", imageUrl: '/logos/madera.png' },
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
