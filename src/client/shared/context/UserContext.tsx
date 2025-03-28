"use client";

import { UserDTO } from "@/server/models/User/UserDTO";
import React, {
  createContext,
  ReactNode,
  use,
  useEffect,
  useState
} from "react";
import { EquiposClient } from "../client/EquiposClient";
import { StorageClient } from "../client/StorageClient";
import { useGetLoggedInUserClient } from "../hooks/useGetLoggedInUserClient";

type UserContextType = {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;

  imagenesEquipos: Record<string, string>;
  setImagenesEquipos: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const user = useGetLoggedInUserClient();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagenesEquipos, setImagenesEquipos] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    StorageClient.getImageUrl(user?.imagen || "").then((url) =>
      setImageUrl(url || "")
    );
  }, [user?.imagen]);

  useEffect(() => {
    if(!user) return
    getImagenesEquipos(user).then((imagenes) => setImagenesEquipos(imagenes));
  }, [user]);

  return (
    <UserContext.Provider value={{ imageUrl, setImageUrl, imagenesEquipos, setImagenesEquipos }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = use(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}


async function getImagenesEquipos(user:UserDTO):Promise<Record<string, string>>{
  const equipos = await EquiposClient.getEquiposDeUsuario(user?.id || "");
  if (!equipos) return {};
  const imagesMap: Record<string, string> = {};

  for (const eq of equipos) {
    if (eq.imagenEquipo) {
      try {
        const url = await StorageClient.getImageUrl(eq.imagenEquipo);
        imagesMap[eq.id] = url;
      } catch (err) {
        console.error("Error obteniendo URL equipo", eq.id, err);
      }
    }
  }
  return imagesMap
}