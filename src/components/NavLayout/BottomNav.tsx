"use client";
import { faCirclePlus, faHome, faMagnifyingGlass, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: faHome },
    { label: "Buscar", href: "/mapa", icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-futbolin", icon: faCirclePlus },
    { label: "Ranking", href: "/ranking", icon: faTrophy },
    { label: "Perfil", href: "/perfil", icon: faUser },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="fixed bottom-0 w-full h-16 bg-neutral-900/95 z-1 flex justify-around items-center">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={`${item.icon}-${index}`}
          className={`p-2 ${isActive(item.href) ? "text-primary" : "text-white"}`}
        >
          <FontAwesomeIcon icon={item.icon} width={28} height={28} className="text-2xl" />
        </Link>
      ))}
    </menu>
  );
};
