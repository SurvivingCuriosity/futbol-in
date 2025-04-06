"use client"
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { CustomSelect } from "futbol-in-ui";

export interface SelectorTipoCompeticionProps {
  onSelect: (selectedOption: number) => void;
  disabled?: boolean;
  value: TipoCompeticion;
}

const SelectorTipoCompeticion = (
  props: SelectorTipoCompeticionProps
) => {
  const { value, onSelect, disabled = false } = props;

  const options = [
    { value: TipoCompeticion.LIGA, label: "Liga" },
    { value: TipoCompeticion.TORNEO, label: "Torneo" },
  ];

  const descTorneo = "Torneo: Se tomarán las parejas inscritas y se generará un bracket aleatorio con varias rondas en función del número de equipos apuntados."
  const descLiga = "Liga: Se tomarán las parejas inscritas y se generará una lista de enfrentamientos (todos contra todos). Una vez realizados los enfrentamientos se contarán los puntos obtenidos por cada equipo para determinar al ganador."

  return (
    <div className="space-y-2">
      <CustomSelect
        value={options.find((o) => o.value === value)}
        onSelect={(selectedOption) => {
          onSelect(Number(selectedOption.value));
        }}
        options={options}
        disabled={disabled}
      />
      <TarjetaMensaje 
        text={value === TipoCompeticion.TORNEO ? descTorneo : descLiga}
        variant="info"
      />
    </div>
  );
};

export default SelectorTipoCompeticion