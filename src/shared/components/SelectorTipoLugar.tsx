import { CustomSelect } from "futbol-in-ui";
import { TipoLugar } from "../enum/Lugares/TipoLugar";

export interface SelectorTipoLugarProps {
  onSelect: (selectedOption: TipoLugar) => void;
  disabled?: boolean;
  value: TipoLugar;
}

export const SelectorTipoLugar = (props: SelectorTipoLugarProps) => {
  const { value, onSelect, disabled = false } = props;

  const options = [
    { value: TipoLugar.FUBTOLIN, label: "Futbolín" },
    { value: TipoLugar.DARDOS, label: "Dardos" },
    { value: TipoLugar.BILLAR, label: "Billar" },
  ];

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
