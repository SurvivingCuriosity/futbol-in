import Image from "next/image";
import Link from "next/link";

export const AppLogo = () => {
  return (
    <Link
      href="/"
      className="font-extrabold text-white flex items-center gap-2"
    >
      <span className="text-white font-extrabold flex items-center antialiased text-3xl italic">
        Futbol
        <Image
          src="/futbolin-logo.svg"
          width={28}
          height={28}
          alt="Logo de Futbol-In"
        />
        n
      </span>
    </Link>
  );
};
