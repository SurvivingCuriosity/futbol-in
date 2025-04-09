"use client";

import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { Window } from "@/packages/components/Window";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HeaderLocation = () => {
  const router = useRouter();
  const user = useGetLoggedInUserClient();
  const { update } = useSession();

  const [showWindow, setShowWindow] = useState(false);

  if (!user) {
    return null;
  }

  const handleChangeCiudadActual = async (nuevaCiudadActual: string) => {
    setShowWindow(false)
    const res = await UserClient.updateUser({
      ...user,
      ciudadActual: nuevaCiudadActual,
    });

    if (res.success) {
      await update()
      router.refresh();
    }
  };

  if(!user.ciudadActual) return null;

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faLocationDot} />
        <p className="text-sm leading-3">{user.ciudadActual?.split(",")[0]}</p>
        <p className="text-neutral-500 text-xs">
          {`(${user.ciudadActual?.split(",")[1]?.trim()})`}
        </p>
      </div>
      <button
        onClick={() => setShowWindow(true)}
        className="text-xs text-neutral-500 underline"
      >
        Cambiar
      </button>
      {showWindow && (
        <Window onClose={() => setShowWindow(false)}>
          <div className="p-5 w-full max-w-xl">
            <p className="text-2xl md:text-3xl font-bold mb-3 text-neutral-400">¿Dónde te encuentras?</p>
            <SearchInputMunicipios onSelect={handleChangeCiudadActual} />
          </div>
        </Window>
      )}
    </div>
  );
};
