"use client";
import { useUser } from "@/client/shared/context/UserContext";
import {
  faCog,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Perfil", href: "/perfil", icon: faUser },
  { label: "Ajustes", href: "/ajustes", icon: faCog },
  { label: "Cerrar sesión", onClick: () => signOut(), icon: faSignOutAlt },
];

export const BotonPerfil: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { imageUrl } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block z-20">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 focus:outline-none z-1"
      >
        <Image
          src={imageUrl || "/default_user.svg"}
          width={50}
          height={50}
          alt="Imagen de perfil"
          className={`rounded-full size-8 object-cover border-2 ${isOpen ? "border-primary" : "border-transparent"}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 z-90 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg">
          <ul className="divide-y divide-neutral-700">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-primary hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (!item.onClick) return;
                      setIsOpen(false);
                      item.onClick();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-primary hover:text-black transition-colors"
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
