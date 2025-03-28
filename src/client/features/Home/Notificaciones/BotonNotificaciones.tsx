"use client";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Notificaciones } from "./Notificaciones";
import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";

export const BotonNotificaciones = ({
  tieneNotificaciones,
  notificaciones,
}: {
  tieneNotificaciones: boolean;
  notificaciones: INotificaciones;
}) => {
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
    <div ref={containerRef} className="relative inline-block z-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 focus:outline-none z-4 relative"
      >
        {tieneNotificaciones && !isOpen && (
          <div className="size-1 rounded-full bg-primary absolute top-2 right-2"></div>
        )}
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBell}
          width={24}
          height={24}
          className="text-white"
        />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 h-dvh w-dvw bg-neutral-950/95 z-3"></div>
      )}
      {isOpen && (
        <div className="absolute top-full right-0 w-[calc(100dvw-1rem)] z-50 px-4">
          <Notificaciones notificaciones={notificaciones} />
        </div>
      )}
    </div>
  );
};
