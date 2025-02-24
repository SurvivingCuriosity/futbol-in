"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, TextInput } from "futbol-in-ui";
import { FormField, FormLabel } from "@/shared/components/FormField";

export default function LoginPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Obtenemos el email de los query params
  const email = searchParams.get("email") || "";

  const handleSignIn = async () => {
    setError("");

    // signIn retorna una promesa con la info
    // si usas redirect: false, recibes un objeto con "ok", "error", "url", etc.
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/", // redirige a donde quieras
    });

    if (result?.error) {
      // Error de credenciales
      setError(result.error);
    } else {
      // Si todo OK, redirigir manualmente o usar callbackUrl
      router.push("/"); // o la ruta que quieras
    }
  };

  return (
    <>
      <FormField>
        <FormLabel>Correo electrónico</FormLabel>
        <TextInput onChangeText={()=>{}} value={email} disabled/>
      </FormField>

      <FormField>
        <FormLabel>Introduce tu contraseña</FormLabel>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
      </FormField>
      <Button onClick={handleSignIn} label="Iniciar sesión" />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
