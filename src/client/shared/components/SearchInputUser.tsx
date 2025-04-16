"use client";
import { UserDTO } from "@/server/models/User/UserDTO";
import { fetchUsers } from "@/server/services/User/searchUsers";
import { CustomAsyncSelect } from "futbol-in-ui";
import { SingleValue } from "react-select";

export interface UserOption {
  value: string;
  label: string;
  data: UserDTO;
}
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

  // 3) Renderizas tu CustomAsyncSelect
  return (
    <CustomAsyncSelect<UserOption>
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
