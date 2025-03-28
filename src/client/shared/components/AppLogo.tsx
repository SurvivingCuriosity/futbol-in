import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({ href='#' }: { href?: string }) => {
  return (
    <Link
      href={href}
      className="font-extrabold text-white flex items-center"
    >
      <span className="text-white font-extrabold items-center antialiased text-3xl hidden sm:flex w-max">
        Futbol
        <Image
          src="/futbolin-logo.svg"
          width={22}
          height={22}
          alt="Logo de Futbol-In"
          style={{height: 22, width: 22}}
          />
        in
      </span>

      <span className="text-white font-extrabold items-center antialiased text-3xl flex sm:hidden space-x-2">
        F
        <Image
          src="/futbolin-logo.svg"
          width={22}
          height={22}
          alt="Logo de Futbol-In"
          style={{height: 22, width: 22}}
        />
      </span>
    </Link>
  );
};
