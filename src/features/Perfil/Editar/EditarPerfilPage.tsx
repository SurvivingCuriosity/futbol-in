import { FormField, FormLabel } from "@/packages/components/FormField";
import { UserClient } from "@/shared/client/UserClient";
import { useGetLoggedInUserClient } from "@/shared/hooks/useGetLoggedInUserClient";
import { UserDTO } from "@/shared/models/User/UserDTO";
import { TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";

export const EditarPerfilPage = () => {
  const sessionUser = useGetLoggedInUserClient();

  const [user, setUser] = useState<UserDTO>();
  const [updatedUser, setUpdatedUser] = useState<UserDTO>();
  const [hayCambios, setHayCambios] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await UserClient.getUserById(sessionUser?.id ?? "-1");
      setUser(res.user);
      setUpdatedUser(res.user);
    };
    getUser();
  }, [sessionUser?.id]);

  useEffect(() => {
    setHayCambios(JSON.stringify(user) !== JSON.stringify(updatedUser));
  }, [user, updatedUser]);

  if (user === undefined || updatedUser === undefined) return null;

  return (
    <div className="relative">
      {hayCambios && (
        <button className="absolute -top-10 right-0 p-1 px-2 text-neutral-900 bg-green-600 rounded-lg">
          Guardar
        </button>
      )}
      <FormField>
        <FormLabel>Nombre de usuario</FormLabel>
        <TextInput
          value={updatedUser?.name}
          onChangeText={(text) =>
            setUpdatedUser((prev) => ({ ...(prev as UserDTO), name: text }))
          }
        />
      </FormField>
      <FormField>
        <FormLabel>Email</FormLabel>
        <TextInput value={updatedUser?.email} onChangeText={() => {}} />
      </FormField>
    </div>
  );
};
