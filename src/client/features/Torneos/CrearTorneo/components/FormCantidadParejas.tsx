import { FormField, FormLabel } from "@/packages/components/FormField";
import { InlinePicker } from "futbol-in-ui";

export const FormCantidadParejas = ({
  onChange,
}: {
  onChange: (v: number) => void;
}) => {
  const opciones = [
    { id: 0, label: "16" },
    { id: 1, label: "32" },
    { id: 2, label: "64" },
  ];
  return (
    <FormField>
      <FormLabel>Cantidad de parejas:</FormLabel>
      <InlinePicker
        onTabClick={(id) =>
          onChange(Number(opciones?.find((o) => o.id === id)?.label) ?? 16)
        }
        options={[
          { id: 0, label: "16" },
          { id: 1, label: "32" },
          { id: 2, label: "64" },
        ]}
      />
    </FormField>
  );
};
