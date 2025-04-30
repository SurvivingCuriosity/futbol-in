import { UserDTO } from "@/server/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";

export const BotonPerfilOperador = ({ user }: { user: UserDTO }) => {
  const router = useRouter();

  const perfilSinCrear = user.idOperador === null;

  if (perfilSinCrear || !user.idOperador) {
    return (
      <Button
        variant="outline"
        label="Crear perfil operador"
        size="sm"
        onClick={() => router.push("/operador/crear")}
      />
    );
  }

  return (
    <Button
      variant="outline"
      label="Perfil de operador"
      size="sm"
      onClick={() => router.push(`/operador/${user.idOperador}`)}
    />
  );
};
