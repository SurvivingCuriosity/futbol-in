import { FormField, FormLabel } from "@/packages/components/FormField";
import { UserClient } from "@/client/shared/client/UserClient";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface CambiarEmailProps {
    emailActual: string;
    closeCallback: () => void;
}

export const CambiarEmail = (props: CambiarEmailProps) => {

    const {emailActual, closeCallback} = props;

    const [nuevoEmail, setNuevoEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleClickCambiarEmail = async () => {
        const res = await UserClient.cambiarEmail({
            idUser: '-1',
            password,
            nuevoEmail,
        });
        if (res.success) {
            toast.success("Puedes iniciar sesión con tu nuevo email");
            signOut()
        } else {
            toast.error("Error al cambiar el email");
        }
    }

  return (
    <>
    <p className="text-primary text-lg">Cambiar email</p>
    <p className="text-xs my-2 mb-4 bg-neutral-900 p-1 border text-neutral-500 rounded-lg">Deberás volver a confirmar el nuevo email a través de un código enviado a tu nuevo email.</p>
      <FormField>
        <FormLabel>Email actual</FormLabel>
        <TextInput value={emailActual} onChangeText={() => {}} disabled />
      </FormField>

      <FormField>
        <FormLabel>Nuevo email</FormLabel>
        <TextInput value={nuevoEmail} onChangeText={setNuevoEmail} />
      </FormField>

      <FormField>
        <FormLabel>Contraseña</FormLabel>
        <PasswordInput value={password} onChangeText={setPassword} />
      </FormField>

      <span className="flex items-center gap-2">
        <Button label="Cancelar" variant="neutral-outline" size="sm" onClick={closeCallback}/>
        <Button label="Cambiar email" variant="outline" size="sm" onClick={handleClickCambiarEmail}/>
      </span>
    </>
  );
};
