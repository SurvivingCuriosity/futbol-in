import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({ href }: { href?: string }) => {
  return (
    <Link
      href={href || "#"}
      className="font-extrabold text-white flex items-center gap-2"
    >
      <span className="text-white font-extrabold items-center antialiased text-3xl italic flex w-max">
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
