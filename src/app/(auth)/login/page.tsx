"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {

  return (
    <>
        <>
          <h1 className="text-3xl text-red-500 font-bold">
            Youre not logged in{" "}
          </h1>
          <div className="flex space-x-5">
            <button
              onClick={() => signIn("google")}
              className="border border-black rounded-lg px-5 py-1"
            >
              Sign in with Google
            </button>
          </div>
        </>
    </>
  );
}
