"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import Link from "next/link";

export const LoginRegister = () => {
  return (
    <>
      <div className="items-center gap-2 justify-end hidden sm:flex *:whitespace-nowrap">
        <Link href="/login">
          <Button size="sm" label="Iniciar sesión" />
        </Link>
        <Link href="/register">
          <Button size="sm" label="Registrarme" variant="outline" />
        </Link>
      </div>

      <Link href="/register" className="flex sm:hidden">
        <FontAwesomeIcon icon={faUser} width={28} height={28} className="text-2xl text-primary" />
      </Link>
    </>
  );
};
