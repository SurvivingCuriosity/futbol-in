import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { UserDTO } from "@/server/models/User/UserDTO";
import { TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";
import { CambiarImagenPerfil } from "./components/CambiarImagenPerfil";
import { DatosDeAcceso } from "./components/DatosDeAcceso";
import { Posicion } from "@/core/enum/Posicion/Posicion";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";

const opciones = [
  { id: 0, value: Posicion.DELANTERO },
  { id: 1, value: Posicion.PORTERO },
  { id: 2, value: Posicion.POLIVALENTE },
];

export const EditarPerfilPage = () => {
  const sessionUser = useGetLoggedInUserClient();

  const { imageUrl } = useUser();

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
  }, [sessionUser?.id, sessionUser?.imagen]);

  useEffect(() => {
    setHayCambios(JSON.stringify(user) !== JSON.stringify(updatedUser));
  }, [user, updatedUser]);

  const handleSubmit = async () => {
    if (!updatedUser) return;
    const res = await UserClient.updateUser(updatedUser);
    if (res.updatedUser) {
      setUser(res.updatedUser);
    }
  };

  if (user === undefined || updatedUser === undefined) return null;

  return (
    <div className="relative p-2 rounded-lg bg-neutral-950/80">
      {hayCambios && (
        <button
          onClick={handleSubmit}
          className="absolute -top-10 right-0 p-1 px-2 text-neutral-900 bg-green-600 rounded-lg"
        >
          Guardar
        </button>
      )}

      <CambiarImagenPerfil url={imageUrl || ""} nombreImagen={user.imagen} />

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
              disabled
            />
            <TarjetaMensaje 
              variant="info"
              text="Contacta con soporte@futbolin.app para cambiar tu nombre de usuario."
            />
          </FormField>
          <FormField>
            <FormLabel>Nombre</FormLabel>
            <TextInput
              value={updatedUser?.nombre || ""}
              onChangeText={(text) =>
                setUpdatedUser((prev) => ({
                  ...(prev as UserDTO),
                  nombre: text,
                }))
              }
            />
          </FormField>
          <FormField>
            <FormLabel>Ciudad</FormLabel>
            <SearchInputMunicipios
              onSelect={(text) =>
                setUpdatedUser((prev) => ({
                  ...(prev as UserDTO),
                  ciudad: text,
                }))
              }
              value={updatedUser?.ciudad || ""}
            />
          </FormField>
          <FormField>
            <FormLabel>Posición favorita</FormLabel>
            <div className="flex items-center gap-2 text-sm mb-2">
              {opciones.map((opcion) => (
                <span
                  onClick={() => setUpdatedUser((prev) => ({ ...(prev as UserDTO), posicion: opcion.value }))}
                  key={opcion.id}
                  className="w-1/3 p-1 bg-neutral-800 text-center rounded-lg relative"
                >
                  {updatedUser.posicion === opcion.value && (
                    <div className="bg-green-400 text-xs absolute -top-1 -right-1 rounded-full size-4">
                      ✓
                    </div>
                  )}
                  {opcion.value}
                </span>
              ))}
            </div>
          </FormField>
        </div>
        <p className="text-primary text-lg border-b w-full">Otros</p>
        <div className="p-4">
        <FormField>
            <FormLabel>Teléfono</FormLabel>
            <TextInput
              value={updatedUser?.telefono || ''}
              onChangeText={(text) =>
                setUpdatedUser((prev) => ({ ...(prev as UserDTO), telefono: text }))
              }
            />
            <TarjetaMensaje 
              variant="info"
              text="Los otros usuarios no pueden ver tu teléfono"
            />
          </FormField>
        </div>
      </div>

      <div className="w-full">
        <p className="text-primary text-lg border-b w-full">Datos de acceso</p>
        <DatosDeAcceso user={user} />
      </div>
    </div>
  );
};
