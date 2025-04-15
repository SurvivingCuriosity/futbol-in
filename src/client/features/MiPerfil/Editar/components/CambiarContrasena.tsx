import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button, PasswordInput } from "futbol-in-ui";
import { useState } from "react";

export interface CambiarContrasenaProps {
    closeCallback: () => void;
}

export const CambiarContrasena = (props: CambiarContrasenaProps) => {

    const {closeCallback} = props;

    const [nuevaPass, setNuevaPass] = useState<string>("");
    const [confirmNuevaPass, setConfirmNuevaPass] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");

    const handleClickCambiarContrasena = async () => {
        // const res = await UserClient.CambiarContrasena({
        //     idUser: '-1',
        //     password,
        //     nuevoEmail,
        // });
        // if (res.success) {
        //     toast.success("Puedes iniciar sesión con tu nuevo email");
        //     signOut()
        // } else {
        //     toast.error("Error al cambiar el email");
        // }
    }

  return (
    <>
    <p className="text-primary text-lg">Cambiar contraseña</p>
      <FormField>
        <FormLabel>Contraseña actual</FormLabel>
        <PasswordInput value={currentPassword} onChangeText={setCurrentPassword} />
      </FormField>

      <FormField>
        <FormLabel>Nueva contraseña</FormLabel>
        <PasswordInput value={nuevaPass} onChangeText={setNuevaPass} />
      </FormField>

      <FormField>
        <FormLabel>Confirmar nueva contraseña</FormLabel>
        <PasswordInput value={confirmNuevaPass} onChangeText={setConfirmNuevaPass} />
      </FormField>

      <span className="flex items-center gap-2">
        <Button label="Cancelar" variant="neutral-outline" size="sm" onClick={closeCallback}/>
        <Button label="Cambiar email" variant="outline" size="sm" onClick={handleClickCambiarContrasena}/>
      </span>
    </>
  );
};
