"use client";

import { AuthClient } from "@/shared/client/AuthClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { Button, TextInput } from "futbol-in-ui";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleClickLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await AuthClient.checkEmail({email});

      if (data.redirect) {
        router.push(data.redirect);
      }
    } catch (err: unknown) {
      setLoading(false);
      setError(getErrorMessage(err));
    }
  };

  return (
    <>
      <FormField>
        <FormLabel>Correo electrónico</FormLabel>
        <TextInput onChangeText={setEmail} placeholder="John Doe" />
      </FormField>

      <FormField>
        <Button
          label="Iniciar sesión"
          onClick={handleClickLogin}
          loading={loading}
        />
      </FormField>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <p className="my-8 text-center text-xs text-neutral-400">
        o si prefieres...
      </p>

      <button
        onClick={(e) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "/" });
        }}
        className="animate-wiggle border rounded-lg px-5 py-2 bg-white/5 flex justify-center items-center gap-2 w-full text-white border-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="size-6"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Acceder con Google
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "/" });
        }}
        className="mt-4 animate-wiggle border bg-[#7289da22] rounded-lg px-5 py-2 flex justify-center items-center gap-2 w-full text-[#7289da] border-[#7289da]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="size-6 fill-[#7289da]"
          viewBox="0 0 16 16"
        >
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
        </svg>
        Acceder con Discord
      </button>

      <Link
        href="/register"
        className="block mt-10 text-sm text-neutral-400 text-center"
      >
        ¿Aún no tienes una cuenta?
      </Link>
    </>
  );
};
