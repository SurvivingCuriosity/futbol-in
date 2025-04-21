import { useUser } from "@/client/shared/context/UserContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PerfilBtn = () => {
  const pathname = usePathname();

  const { imageUrl } = useUser();

  const session = useSession();

  const isActive = (href: string) => {
    if (href === "/perfil") {
      return pathname === "/perfil";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link href={"/perfil"} className={`tour-perfil flex items-center justify-center p-2`} prefetch>
    {session.status === "authenticated" ? (
      <Image
        src={imageUrl || "/default_user.svg"}
        width={22}
        height={22}
        className={`text-xl size-6 rounded-full border-2  ${
          isActive("/perfil") ? "border-primary" : "border-transparent"
        } object-center object-cover`}
        alt="Imagen de perfil"
        aria-label="Perfil"
      />
    ) : (
      <FontAwesomeIcon
        icon={faUser}
        width={22}
        height={22}
        className="text-xl"
      />
    )}
  </Link>
  );
};
