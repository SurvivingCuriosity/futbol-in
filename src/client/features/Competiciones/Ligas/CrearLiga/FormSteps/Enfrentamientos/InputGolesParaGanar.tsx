import { NumberInput } from "@/packages/components/NumberInput";


export interface InputGolesParaGanarProps {
  label?: string;
  value: number;
  onUpdateValue: (value: number) => void;
}

export const InputGolesParaGanar = (props: InputGolesParaGanarProps) => {
  
  const { label = "Llegar a", value, onUpdateValue} = props;

  return (
    <div className="flex flex-row items-center mb-1 justify-between">
      <p className="w-1/3">{label}</p>
      <NumberInput value={value} onChange={onUpdateValue} min={1} />
      <p className="ml-2 w-1/3">goles</p>
    </div>
  );
};
