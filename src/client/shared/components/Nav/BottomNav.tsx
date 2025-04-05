"use client";

import fondo from "@/client/shared/assets/img/torneos/enfrentamientos.webp";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import {
  faCirclePlus,
  faHome,
  faMagnifyingGlass,
  faTrophy,
  faUser,
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
    { label: "Ranking", href: "/competitivo", icon: faTrophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="md:hidden fixed bottom-0 w-full z-2">
      <div className="w-full h-12 bg-neutral-900/95 flex justify-around items-center relative">
        <Image
          loading="lazy"
          src={fondo}
          alt="Fondo"
          width={200}
          height={100}
          className="absolute bottom-10 w-screen left-0 z-0 rounded-lg opacity-20 grayscale pointer-events-none"
        />
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={`${item.icon}-${index}`}
            className={`p-2 ${
              isActive(item.href) ? "text-primary" : "text-white"
            }`}
            aria-label={item.label}
          >
            <FontAwesomeIcon
              icon={item.icon}
              width={28}
              height={28}
              className="text-xl"
            />
          </Link>
        ))}
        <Link href={"/perfil"} className={`p-2`}>
          {session.status === "authenticated" ? (
            <Image
              src={imageUrl || "/default_user.svg"}
              width={28}
              height={28}
              className={`text-xl size-6 rounded-full border-2  ${
                isActive("/perfil") ? "border-primary" : "border-transparent"
              } object-center object-cover`}
              alt="Imagen de perfil"
              aria-label="Perfil"
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
      </div>
    </menu>
  );
};
