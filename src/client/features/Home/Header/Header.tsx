import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import React from "react";

export const Header = () => {
  const user = useGetLoggedInUserClient();

  if (!user) {
    return null;
  }

  return (
    <header className="flex items-center justify-between mb-4">
      <div>
        <p className="text-neutral-500 leading-3">Bienvenido,</p>
        <p className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()+user.name.slice(1).toLowerCase()}</p>
      </div>
    </header>
  );
};
