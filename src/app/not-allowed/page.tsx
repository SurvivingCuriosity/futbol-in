"use client";
import { Button } from "futbol-in-ui";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-2 pt-10 lg:p-10">
      <h1 className="text-3xl font-black">Ups...</h1>
      <p className="text-sm text-neutral-500">
        Necesitas tener una cuenta para acceder a esta página.
      </p>
      <div className="flex w-full gap-2 items-center justify-center">
        <Link href="/login">
          <Button size="sm" label="Iniciar sesión" />
        </Link>
        <Link href="/register">
          <Button size="sm" label="Registrarme" variant="outline" />
        </Link>
      </div>
    </div>
  );
};
export default page;
