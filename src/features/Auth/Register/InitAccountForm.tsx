// /app/register/step3/page.tsx
"use client";

import { AuthClient } from "@/shared/client/AuthClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InitAccountForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Debounce: chequear disponibilidad de username
  useEffect(() => {
    if (!username) {
      setIsUsernameAvailable(false);
      setUsernameError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await AuthClient.checkUsername(username);
        setIsUsernameAvailable(res.available);
        setUsernameError(
          res.available ? "" : "Este username no está disponible"
        );
      } catch (err: unknown) {
        setIsUsernameAvailable(false);
        setUsernameError(getErrorMessage(err));
      }
    }, 500); // Esperamos 500ms sin teclear

    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async () => {
    setError("");
    if (!isUsernameAvailable) {
      setError("Ese nombre de usuario no está disponible");
      return;
    }

    try {
      const res = await AuthClient.initAccount({ username, password });
      if (res) {
        router.push("/");
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-primary">
        Bienvenido!
      </h1>

      <FormField>
        <FormLabel>Username</FormLabel>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="johny99"
          successText={
            isUsernameAvailable ? "Nombre de usuario disponible" : ""
          }
          errorText={usernameError}
        />
      </FormField>

      <FormField>
        <FormLabel>Contraseña</FormLabel>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="johny99"
        />
      </FormField>

      <FormField>
        <FormLabel>Confirmar contraseña</FormLabel>
        <PasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="johny99"
        />
      </FormField>

      <Button onClick={handleSubmit} label="Finalizar" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
