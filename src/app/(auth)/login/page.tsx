"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page() {

  return (
    <div className="h-screen w-screen bg-neutral-900 flex items-center justify-center flex-col">
      <Link href={'/'}>
        <FontAwesomeIcon icon={faArrowLeft} width={24} height={24} className="text-amber-500 border p-2 rounded-full size-8" />
      </Link>
      <form className="p-4 bg-neutral-800 border-amber-400 border rounded-lg w-11/12 max-w-[400px]">
        
          <FormField>
            <label className="text-amber-500">Email o nombre de usuario</label>
            <input type="email" placeholder="john@example.com" className="border w-full border-black rounded-lg p-2 block bg-neutral-200" />
          </FormField>

          <FormField>
            <label className="text-amber-500">Contraseña</label>
            <input type="password" placeholder="Email" className="border w-full border-black rounded-lg p-2 block bg-neutral-200" />
          </FormField>


          <button
            onClick={(e) => {
              e.preventDefault()
              signIn("google")
            }}
            className="border rounded-lg px-5 py-1 flex justify-center items-center gap-2 w-full text-amber-500 border-amber-500"
          >
            Sign in with Google
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="size-7 fill-amber-500">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
          </button>

      </form>
    </div>
  );
}


const FormField = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="space-y-2 mb-4 w-full">
      {children}
    </div>
  )
}