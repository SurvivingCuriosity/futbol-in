"use client";

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

  const items = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Buscar", href: `/spots`, icon: faMagnifyingGlass },
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
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={`${item.icon}-${index}`}
            className={`p-2 ${
              isActive(item.href) ? "text-primary" : "text-white"
            }`}
            aria-label={item.label}
            prefetch
          >
            <FontAwesomeIcon
              icon={item.icon}
              width={22}
              height={22}
              className="text-xl"
            />
          </Link>
        ))}
        <Link href={"/perfil"} className={`p-2`} prefetch>
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
      </div>
    </menu>
  );
};
