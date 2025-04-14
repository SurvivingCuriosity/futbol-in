"use client";
import { DistribucionFutbolin } from "@/core/enum/Futbolin/DistribucionFutbolin";
import { CustomSelect } from "futbol-in-ui";
import { memo } from "react";

export interface SelectorDistribucionFutbolinProps {
  value: DistribucionFutbolin;
  onSelect: (selectedOption: DistribucionFutbolin) => void;
  disabled?: boolean;
}

const SelectorDistribucionFutbolin = memo((props: SelectorDistribucionFutbolinProps) => {
  const {
    value,
    onSelect,
    disabled = false,
  } = props;

  const futbolinOptions = [
    { value: DistribucionFutbolin.F4, label: "F4" },
    { value: DistribucionFutbolin.F5, label: "F5" },
  ];


  return (
    <CustomSelect
      value={futbolinOptions.find((o) => o.value === value)}
      onSelect={(selectedOption) => {
        onSelect(selectedOption.value);
      }}
      options={futbolinOptions}
      disabled={disabled}
    />
  );
});

SelectorDistribucionFutbolin.displayName = "SelectorDistribucionFutbolin";

export default SelectorDistribucionFutbolin;
