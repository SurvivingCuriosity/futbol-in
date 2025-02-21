// /app/register/step2/page.tsx

"use client";

import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmEmailForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    try {
      const res = await fetch("/api/register/confirm-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error verificando código");
      }
      // Si OK, pasamos al step 3
      router.push("/register/init-account");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-primary">Confirmar correo electrónico</h1>
      <p className="text-neutral-400 text-xs mb-8 mt-2">Te hemos mandado un correo electrónico con un código de verificación. Ingresa el código para continuar.</p>
      <input
        type="text"
        placeholder="Ingresa tu código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-neutral-800 rounded-lg p-4 w-full mb-4"
      />
      <Button onClick={handleVerify} label="Verificar" />
      <p className="p-2 rounded-md bg-neutral-900 text-xs text-neutral-500 mt-4">Recuerda revisar tu carpeta de spam si no ves el correo en tu bandeja de entrada.</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
