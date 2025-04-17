import { esOperador } from "@/core/helpers/esOperador";
import { UserDTO } from "@/server/models/User/UserDTO";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HamburguerMenu = ({ user }: { user: UserDTO }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      style={{ zIndex: 1000 }}
      className="fixed top-2 right-2 md:top-20 md:right-72"
    >
      <div>
        <div className="mx-auto flex flex-row items-center justify-between py-2 text-neutral-200">
          <button
            aria-label="Botón abrir menú lateral"
            onClick={toggleMenu}
            className="z-20 flex size-6 flex-col justify-center gap-2"
          >
            <span
              className={`${
                isOpen ? "rotate-[45deg] scale-[130%]" : "rotate-0"
              } h-[3px] w-full rounded-lg bg-neutral-200 transition-all duration-200 origin-top-left`}
            ></span>
            <span
              className={`${
                isOpen ? "opacity-0" : "opacity-100"
              } h-[3px] w-full rounded-lg bg-neutral-200 transition-all duration-200 origin-bottom-left`}
            ></span>
            <span
              className={`${
                isOpen ? "-rotate-[45deg] scale-[130%]" : "rotate-0"
              } h-[3px] w-full rounded-lg bg-neutral-200 transition-all duration-200 origin-bottom-left`}
            ></span>
          </button>

          <div
            className={`flex flex-col justify-between fixed top-0 z-10 h-dvh w-screen bg-neutral-950/95 ${
              isOpen ? "left-0" : "left-full"
            } transition-all duration-200 pt-20 pb-4`}
          >
            <ul
              className={`w-full px-7 *:mb-8 *:border-b *:text-2xl *:border-neutral-200`}
            >
              <li
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Link href="/politica-de-privacidad?from=/perfil">
                  Política de privacidad
                </Link>
              </li>
              {esOperador(user) && (
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Link
                    href={`/operador/${user.idOperador}/futbolines?from=/perfil`}
                  >
                    Mis futbolines
                  </Link>
                </li>
              )}
              {esOperador(user) && (
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Link
                    href={`/god/futbolines?from=/perfil`}
                  >
                    Futbolines
                  </Link>
                </li>
              )}
              {esOperador(user) && (
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Link
                    href={`/god/usuarios?from=/perfil`}
                  >
                    Usuarios
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
