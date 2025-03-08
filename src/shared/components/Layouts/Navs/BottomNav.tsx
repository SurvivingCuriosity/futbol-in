"use client";

import {
  LStorage,
  LStorageKeys,
} from "@/shared/services/LocalStorage/LStorage";
import {
  faCirclePlus,
  faHome,
  faMagnifyingGlass,
  faTrophy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();

  const ultimaUbicacion =
    typeof window !== "undefined" &&
    LStorage.getItem(LStorageKeys.ULTIMA_UBICACION);

  const ciudad = encodeURIComponent(ultimaUbicacion.ciudad);
  const placeId = ultimaUbicacion.placeId;

  const rutaFutbolines = (ciudad && placeId)
    ? `/spots/${ciudad}/${placeId}`
    : "/spots";

  const items = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Buscar", href: rutaFutbolines, icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-spot", icon: faCirclePlus },
    { label: "Ranking", href: "/logros/ranking", icon: faTrophy },
    { label: "Perfil", href: "/perfil", icon: faUser },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="fixed bottom-0 w-full h-12 bg-neutral-900/95 z-5 flex justify-around items-center">
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
    </menu>
  );
};
