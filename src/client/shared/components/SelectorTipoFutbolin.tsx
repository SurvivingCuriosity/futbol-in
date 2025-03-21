"use client";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { CustomSelect } from "futbol-in-ui";

export interface SelectorTipoFutbolinProps {
  value: TipoFutbolin;
  onSelect: (selectedOption: TipoFutbolin) => void;
  disabled?: boolean;
  incluirOpcionTodos?: boolean;
}

const SelectorTipoFutbolin = (props: SelectorTipoFutbolinProps) => {
  const {
    value,
    onSelect,
    disabled = false,
    incluirOpcionTodos = false,
  } = props;

  const futbolinOptions = [
    { value: TipoFutbolin.TSUNAMI, label: "Tsunami" },
    { value: TipoFutbolin.INFINITY, label: "Infinity" },
    { value: TipoFutbolin.PRESAS, label: "Presas" },
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
};

export default SelectorTipoFutbolin;
