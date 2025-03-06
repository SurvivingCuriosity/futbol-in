import { FormLabel } from "@/shared/components/FormField";

export interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = (props: SwitchProps) => {
  const { label, checked, onChange } = props;

  return (
    <label className="inline-flex items-center cursor-pointer gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-neutral-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" 
      ></div>
      {label && (
        <FormLabel>
          {label}
        </FormLabel>
      )}
    </label>
  );
};
