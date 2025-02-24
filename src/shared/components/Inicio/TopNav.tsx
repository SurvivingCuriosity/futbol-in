"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BotonPerfil } from "./BotonPerfil";

export const TopNav = ({loggedIn} : {loggedIn: boolean}) => {
  return (
    <div className="w-full h-16 top-0 flex bg-transparent items-center justify-center z-10">
      <div className="max-w-screen-lg flex items-center justify-between mx-auto w-full p-2 px-4">
        <Link href="/" className="font-extrabold text-white text-2xl">
          <Image
            src="/futbolin-logo.svg"
            width={24}
            height={24}
            alt="Logo de Futbol-In"
          />
        </Link>

        {loggedIn && <button onClick={() => signOut()}>Sign out</button>}

        <BotonPerfil />

        {/* <div className="flex items-center gap-2">
          <button>Sign out</button>
          <button className="flex flex-col items-center justify-center gap-2">
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
          </div> */}
      </div>
    </div>
  );
};
