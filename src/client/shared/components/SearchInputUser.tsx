"use client";
import { UserDTO } from "@/server/models/User/UserDTO";
import { fetchUsers } from "@/server/services/User/searchUsers";
import { AsyncSelectProps } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";

export interface UserOption {
  value: string;
  label: string;
  data: UserDTO;
}

const CustomAsyncSelectNoSSR = dynamic<AsyncSelectProps<UserOption>>(
  () =>
    import("futbol-in-ui").then((mod) => ({
      default: mod.CustomAsyncSelect,
    })),
  {
    ssr: false,
  }
);

export default function SearchInputUser({
  value,
  onSelect,
  disabled,
}: {
  value: UserOption|undefined
  onSelect: (val: UserOption) => void;
  disabled?: boolean;
}) {
  
  const handleSelect = (selected: SingleValue<UserOption>) => {
    if (!selected) return;
    onSelect(selected);
  };


  return (
    <CustomAsyncSelectNoSSR
      value={value}
      onSelect={handleSelect}
      loadOptions={fetchUsers}
      disabled={disabled}
      placeholder="Escribe para buscar..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
