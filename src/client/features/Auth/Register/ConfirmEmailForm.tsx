"use client";

import { AuthClient } from "@/client/shared/client/AuthClient";
import { getErrorMessageClient } from "@/client/shared/client/errorHandler/errorHandler";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AuthClient.confirmEmail({ code });
      if (res) {
        router.push("/register/init-account");
      }
      setLoading(false);
    } catch (error: unknown) {
      setError(getErrorMessageClient(error, "code"));
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-primary">
        Confirmar correo electrónico
      </h1>
      <p className="text-neutral-400 text-xs mb-8 mt-2">
        {`Hemos mandado un correo electrónico a ${email} con un código de verificación. Ingresa el código para continuar.`}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
      >
        <input
          type="text"
          placeholder="Ingresa tu código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-neutral-800 rounded-lg p-4 w-full mb-4"
        />
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
        <Button onClick={handleVerify} label="Verificar" loading={loading} />
      </form>
      <TarjetaMensaje
        text={
          "Recuerda revisar tu carpeta de spam si no ves el correo en tu bandeja de entrada."
        }
        variant="info"
      />
    </>
  );
}
