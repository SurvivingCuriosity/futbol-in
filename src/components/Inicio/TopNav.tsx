
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const TopNav = () => {
  
  const session = getServerSession()

  return (
    <div className="w-full h-16 top-0 flex bg-transparent items-center justify-center z-10">
      <div className="max-w-screen-lg flex items-center justify-between mx-auto w-full p-2 px-4">
        <Link href="/" className="font-extrabold text-white text-2xl">
          Futbol In
        </Link>

        {!!session ? (
          <div className="flex items-center gap-2">
          <button>Sign out</button>
          <button className="flex flex-col items-center justify-center gap-2">
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
          </div>
        ) : (
          <Link href="/login">
            <FontAwesomeIcon
              icon={faUserCircle}
              width={24}
              height={24}
              className="text-white"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
