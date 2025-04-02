import Image from "next/image";
import Link from "next/link";

export const AppLogo = ({ href = "#" }: { href?: string }) => {
  return (
    <Link href={href} className="font-extrabold text-white flex items-center" draggable={false}>
      <span className="text-white font-extrabold items-center antialiased text-3xl flex w-max leading-0">
        Futbol
        <Image
          src="/futbolin-logo.svg"
          width={22}
          height={22}
          alt="Logo de Futbol-In"
          style={{ height: 22, width: 22 }}
          draggable={false}
        />
        in
      </span>
    </Link>
  );
};
