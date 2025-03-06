import { CustomSelect } from "futbol-in-ui";
import { TipoFutbolin } from "../enum/Futbolin/TipoFutbolin";

export interface SelectorTipoFutbolinProps {
  value: TipoFutbolin;
  onSelect: (selectedOption: TipoFutbolin) => void;
  disabled?: boolean;
  incluirOpcionTodos?:boolean;
}

export const SelectorTipoFutbolin = (props: SelectorTipoFutbolinProps) => {
  const { value, onSelect, disabled = false, incluirOpcionTodos = false } = props;

  const futbolinOptions = [
    { value: TipoFutbolin.TSUNAMI, label: "Tsunami" },
    { value: TipoFutbolin.INFINITY, label: "Infinity" },
    { value: TipoFutbolin.PRESAS, label: "Presas" },
    { value: TipoFutbolin.PRESAS_EVO, label: "Presas Evo" },
    { value: TipoFutbolin.GENERICO, label: "Genérico" },
    { value: TipoFutbolin.GENÉRICO_MADERA, label: "Genérico de madera" },
  ];

  const options = incluirOpcionTodos
    ? [{value: TipoFutbolin.CUALQUIERA, label: "Cualquiera"}, ...futbolinOptions]
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
