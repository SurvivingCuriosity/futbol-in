"use client";
import {
  faCog,
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Perfil", href: "/perfil", icon: faUser },
  { label: "Ajustes", href: "/settings", icon: faCog },
  { label: "Cerrar sesión", onClick: () => signOut(), icon: faSignOutAlt },
];

export const BotonPerfil: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative inline-block z-1">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 focus:outline-none z-1"
      >
        <FontAwesomeIcon
          icon={faUserCircle}
          width={24}
          height={24}
          className="text-white"
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-50">
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
