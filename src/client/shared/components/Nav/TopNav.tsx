"use client";
import { AppLogo } from "@/client/shared/components/AppLogo";
import {
  faCirclePlus,
  faMagnifyingGlass,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotonPerfil } from "./components/BotonPerfil";
import { LoginRegister } from "./components/LoginRegister";

export const TopNav = () => {
  const pathname = usePathname();

  const session = useSession();

  const items = [
    { label: "Buscar", href: `/ciudades`, icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-spot", icon: faCirclePlus },
    { label: "Competitivo", href: "/competitivo", icon: faTrophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="hidden md:block w-full h-16 bg-neutral-900 z-2 relative">
      <div className="flex items-center h-full mx-auto justify-between gap-8 max-w-screen-xl px-4">
        <div className="flex items-center gap-8">
          <AppLogo href="/" />
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <Link
                href={item.href}
                key={`${item.icon}-${index}`}
                className={`p-1 px-2 hover:bg-primary/20 rounded-lg ${
                  isActive(item.href) ? "text-primary" : "text-white"
                }`}
              >
                <p>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {session.status === "authenticated" ? (
          <BotonPerfil />
        ) : (
          <LoginRegister />
        )}
      </div>
    </menu>
  );
};
