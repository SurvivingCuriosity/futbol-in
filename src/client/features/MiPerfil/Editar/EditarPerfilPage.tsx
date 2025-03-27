import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputCiudad from "@/client/shared/components/SearchInputCiudad";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { UserDTO } from "@/server/models/User/UserDTO";
import { TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";
import { CambiarImagenPerfil } from "./components/CambiarImagenPerfil";
import { DatosDeAcceso } from "./components/DatosDeAcceso";

export const EditarPerfilPage = () => {
  const sessionUser = useGetLoggedInUserClient();

  const [user, setUser] = useState<UserDTO>();
  const [userImage, setUserImage] = useState<string>();
  const [updatedUser, setUpdatedUser] = useState<UserDTO>();
  const [hayCambios, setHayCambios] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await UserClient.getUserById(sessionUser?.id ?? "-1");
      setUser(res.user);
      setUpdatedUser(res.user);
    };
    const getUserImage = async () => {
      const url = await UserClient.getUserImageUrl(sessionUser?.imagen ?? "");
      setUserImage(url);
    };
    getUser();
    getUserImage();
  }, [sessionUser?.id, sessionUser?.imagen]);

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

      <CambiarImagenPerfil url={userImage || ''}/>

      <div className="mb-4 w-full">
        <p className="text-primary text-lg border-b w-full">Público</p>
        <div className="p-4">
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
            <FormLabel>Bio</FormLabel>
            <TextInput value={""} onChangeText={() => {}} />
          </FormField>
          <FormField>
            <FormLabel>Ciudad</FormLabel>
            <SearchInputCiudad />
          </FormField>
        </div>
      </div>
      <div className="w-full">
        <p className="text-primary text-lg border-b w-full">Datos de acceso</p>
        <DatosDeAcceso user={user}/>
      </div>
    </div>
  );
};
