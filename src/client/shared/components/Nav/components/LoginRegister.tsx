"use client";

import { Button } from "futbol-in-ui";
import Link from "next/link";

export const LoginRegister = ({expanded=false}:{expanded?:boolean}) => {
  return (
    <>
      <div className="items-center gap-2 justify-end flex *:whitespace-nowrap">
        <Link href="/login" className={`${expanded ? 'block' : 'hidden sm:block'}`}>
          <Button size="sm" label="Iniciar sesión" />
        </Link>
        <Link href="/register">
          <Button size="sm" label="Registrarme" variant="outline" />
        </Link>
      </div>
    </>
  );
};
