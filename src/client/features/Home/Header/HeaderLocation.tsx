"use client";

import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import { Window } from "@/packages/components/Window";
import { UserDTO } from "futbol-in-core/types";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const HeaderLocation = ({
  onChangeCiudad,
  user
}: {
  onChangeCiudad?: (ciudad: string) => void;
  user:UserDTO
}) => {
  const { update } = useSession();

  const [showWindow, setShowWindow] = useState(false);

  if (!user) {
    return null;
  }

  const handleChangeCiudadActual = async (nuevaCiudadActual: string) => {
    setShowWindow(false);
    const res = await UserClient.updateUser({
      ...user,
      ciudadActual: nuevaCiudadActual,
    });

    if (res.success) {
      await update();
    }
    if (onChangeCiudad) {
      onChangeCiudad(nuevaCiudadActual);
    }
  };

  if (!user.ciudadActual) return null;

  return (
    <div className="flex justify-between w-full px-2 p-1.5 bg-neutral-400/80 text-neutral-900">
      <div className="flex items-center gap-1">
        <FontAwesomeIcon icon={faLocationDot} className="text-sm"/>
        <p className="text-sm leading-3">{user.ciudadActual?.split(",")[0]}</p>
        <p className="text-neutral-600 text-xs">
          {`(${user.ciudadActual?.split(",")[1]?.trim()})`}
        </p>
      </div>
      <button
        onClick={() => setShowWindow(true)}
        className="text-xs text-neutral-900 underline"
      >
        Cambiar
      </button>
      {showWindow && (
        <Window onClose={() => setShowWindow(false)}>
          <div className="p-5 w-full max-w-xl">
            <p className="text-2xl md:text-3xl font-bold mb-3 text-neutral-400">
              ¿Dónde te encuentras?
            </p>
            <SearchInputMunicipios onSelect={handleChangeCiudadActual} />
          </div>
        </Window>
      )}
    </div>
  );
};
