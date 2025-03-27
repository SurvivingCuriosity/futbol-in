import { UserOption } from "@/client/shared/components/SearchInputUser";
import { UserDTO } from "@/server/models/User/UserDTO";

export async function fetchUsers(
  inputValue: string | number
): Promise<UserOption[]> {
  if (!inputValue) return [];

  const res = await fetch(
    `/api/user/search?q=${encodeURIComponent(inputValue)}`,
    {
      method:'GET'
    }
  );
  if (!res.ok) {
    console.error("Error al buscar usuarios");
    return [];
  }

  const data: UserDTO[] = await res.json();

  return data.map((user) => ({
    value: user.id,
    label: user.name,
    data: user,
  }));
}
