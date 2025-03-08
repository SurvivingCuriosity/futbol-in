"use client";

import { AuthClient } from "@/shared/client/AuthClient";
import { FormField, FormLabel } from "@/shared/components/FormField";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Button, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InitUsernameForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [error, setError] = useState("");

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
      const res = await AuthClient.initUsername({username});
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

      <p className="bg-neutral-800 text-xs text-neutral-400 rounded-lg p-2 my-2">
        Parece que es tu primera vez aquí... Debes crear un nombre de usuario
      </p>

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

      <Button onClick={handleSubmit} label="Finalizar" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
