"use client";

import { AuthClient } from "@/client/shared/client/AuthClient";
import { getErrorClient } from "@/client/shared/client/errorHandler/errorHandler";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function InitAccountForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // Debounce: chequear disponibilidad de username
  useEffect(() => {
    if (!username || username.length < 3) {
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
    setLoading(true);
    setError("");
    if (username!== "" && !isUsernameAvailable) {
      setError("Ese nombre de usuario no está disponible");
      setLoading(false);
      return;
    }

    try {
      const res = await AuthClient.initAccount({ username, password, confirmPassword });
      if (res) {
        toast.success('Inicia sesión con tu nueva cuenta')
        router.push("/");
      }
      setLoading(false);
    } catch (error: unknown) {
      setError(getErrorClient(error));
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-primary">
        Bienvenido!
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormField>
          <FormLabel>Nombre de usuario</FormLabel>
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

        <Button onClick={handleSubmit} label="Finalizar" loading={loading}/>
      </form>
      {error && <p className="text-red-500 text-xs my-4">{error}</p>}
    </>
  );
}
