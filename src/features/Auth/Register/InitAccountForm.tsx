// /app/register/step3/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormField, FormLabel } from "@/components/FormField";
import { Button, TextInput } from "futbol-in-ui";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function InitAccountForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");


  console.log('=========');
  console.log('username', username);

  // Debounce: chequear disponibilidad de username
  useEffect(() => {
    if (!username) {
      setIsUsernameAvailable(false);
      setUsernameError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/register/check-username?username=${username}`
        );
        const data = await res.json();
        if (!res.ok) {
          setIsUsernameAvailable(false);
          setUsernameError(data.error || "Error verificando username");
        } else {
          setIsUsernameAvailable(data.available);
          setUsernameError(
            data.available ? "" : "Este username no está disponible"
          );
        }
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
      const res = await fetch("/api/register/init-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error creando tu cuenta");
      }

      // Si todo OK, redirigir a la home o donde quieras
      router.push("/");
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
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="johny99"
        />
      </FormField>

      <FormField>
        <FormLabel>Confirmar contraseña</FormLabel>
        <TextInput
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
