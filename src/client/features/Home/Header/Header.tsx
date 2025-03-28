import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import Image from "next/image";
import React from "react";

export const Header = () => {
  const user = useGetLoggedInUserClient();

  const { imageUrl } = useUser();

  if (!user) {
    return null;
  }

  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt="Imagen de perfil"
          className="rounded-full"
        />
        <div>
          <p className="text-neutral-500 leading-3">Bienvenido,</p>
          <p className="text-2xl font-bold">
            {user.name.charAt(0).toUpperCase() +
              user.name.slice(1).toLowerCase()}
          </p>
        </div>
      </div>
    </header>
  );
};
