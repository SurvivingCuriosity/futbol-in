"use client";

import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import {
  faCirclePlus,
  faHome,
  faMagnifyingGlass,
  faTrophy,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../../context/UserContext";

export const BottomNav = () => {
  const pathname = usePathname();

  const { imageUrl } = useUser();

  const session = useSession();

  const ultimaUbicacion =
    typeof window !== "undefined" &&
    LStorage.getItem(LStorageKeys.ULTIMAS_UBICACIONES)?.[0];

  const ciudad = encodeURIComponent(ultimaUbicacion?.ciudad);
  const placeId = ultimaUbicacion?.placeId;

  const rutaFutbolines =
    ciudad && placeId ? `/spots/${ciudad}/${placeId}` : "/spots";

  const items = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Buscar", href: rutaFutbolines, icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-spot", icon: faCirclePlus },
    { label: "Ranking", href: "/competicion", icon: faTrophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="md:hidden fixed bottom-0 w-full h-12 bg-neutral-900/95 z-5 flex justify-around items-center">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={`${item.icon}-${index}`}
          className={`p-2 ${
            isActive(item.href) ? "text-primary" : "text-white"
          }`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            width={28}
            height={28}
            className="text-xl"
          />
        </Link>
      ))}
      <Link
        href={"/perfil"}
        className={`p-2`}
      >
        {session.status === "authenticated" ? (
          <Image
            src={imageUrl || '/default_user.svg'}
            width={28}
            height={28}
            className={`text-xl size-6 rounded-full border-2  ${isActive("/perfil") ? "border-primary" : "border-transparent"} object-center object-cover`}
            alt="Imagen de perfil"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            width={28}
            height={28}
            className="text-xl"
          />
        )}
      </Link>
    </menu>
  );
};
