"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCirclePlus, faHome, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

export const BottomNav = () => {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Buscar", href: "/mapa", icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-futbolin", icon: faCirclePlus },
    { label: "Favoritos", href: "/favoritos", icon: faBookmark },
    { label: "Perfil", href: "/usuario", icon: faUser },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="fixed bottom-0 w-full h-16 bg-neutral-900 flex justify-around items-center">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={`${item.icon}-${index}`}
          className={`p-2 ${isActive(item.href) ? "text-lime-300" : "text-white"}`}
        >
          <FontAwesomeIcon icon={item.icon} width={28} height={28} className="text-2xl" />
        </Link>
      ))}
    </menu>
  );
};
