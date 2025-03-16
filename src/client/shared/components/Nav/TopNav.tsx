"use client";
import { AppLogo } from "@/client/shared/components/AppLogo";
import {
  faCirclePlus,
  faMagnifyingGlass,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotonPerfil } from "./components/BotonPerfil";
import { useSession } from "next-auth/react";
import { LoginRegister } from "./components/LoginRegister";
import { LStorage, LStorageKeys } from "../../services/LocalStorage/LStorage";

export const TopNav = () => {
  const pathname = usePathname();

  const session = useSession();

  const ultimaUbicacion =
    typeof window !== "undefined" &&
    LStorage.getItem(LStorageKeys.ULTIMAS_UBICACIONES)?.[0];

  const ciudad = encodeURIComponent(ultimaUbicacion?.ciudad);
  const placeId = ultimaUbicacion?.placeId;

  const rutaFutbolines =
    ciudad && placeId ? `/spots/${ciudad}/${placeId}` : "/spots";

  const items = [
    { label: "Buscar", href: rutaFutbolines, icon: faMagnifyingGlass },
    { label: "Agregar", href: "/agregar-spot", icon: faCirclePlus },
    { label: "Ranking", href: "/ranking", icon: faTrophy },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <menu className="hidden md:block w-full h-16 bg-neutral-900">
      <div className="flex items-center h-full mx-auto justify-between gap-8 max-w-screen-xl px-4">
        <div className="flex items-center gap-8">
          <AppLogo href="/" />
          <div className="flex items-center gap-2 text-lg">
            {items.map((item, index) => (
              <Link
                href={item.href}
                key={`${item.icon}-${index}`}
                className={`p-2 hover:bg-primary/20 rounded-lg ${
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
