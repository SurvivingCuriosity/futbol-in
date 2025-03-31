"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { FormField, FormLabel } from "@/packages/components/FormField";

export default function LoginPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email") || "";

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <FormField>
        <FormLabel>Correo electrónico</FormLabel>
        <TextInput onChangeText={() => {}} value={email} disabled />
      </FormField>

      <FormField>
        <FormLabel>Introduce tu contraseña</FormLabel>
        <PasswordInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
      </FormField>
      <Button onClick={handleSignIn} label="Iniciar sesión" loading={loading} disabled={loading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
