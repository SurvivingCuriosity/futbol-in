import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({ href }: { href?: string }) => {
  return (
    <Link
      href={href || "#"}
      className="font-extrabold text-white flex items-center gap-2"
    >
      <span className="text-white font-extrabold items-center antialiased text-3xl italic hidden sm:flex w-max">
        Futb
        <Image
          src="/futbolin-logo.svg"
          width={22}
          height={22}
          alt="Logo de Futbol-In"
        />
        lin
      </span>

      <span className="text-white font-extrabold items-center antialiased text-3xl italic flex sm:hidden space-x-2">
        F
        <Image
          className="ml-0.5"
          src="/futbolin-logo.svg"
          width={22}
          height={22}
          alt="Logo de Futbol-In"
        />
      </span>
    </Link>
  );
};
