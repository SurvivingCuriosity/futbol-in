import { NumberInput } from "@/packages/components/NumberInput";


export interface InputPartidosPorEnfrentamientoProps {
  label?: string
  value:number;
  onUpdateValue:(value:number)=>void;
}

export const InputPartidosPorEnfrentamiento = (props:InputPartidosPorEnfrentamientoProps) => {

    const { label = "Al mejor de", value, onUpdateValue } = props

  return (
    <div className="flex flex-row items-center justify-between mb-1">
      <p className="w-1/3">{label}</p>
      <NumberInput value={value} onChange={onUpdateValue} min={1}/>
      <p className="ml-2 w-1/3">partidos</p>
    </div>
  );
};
