"use client";

import React, {
  createContext,
  ReactNode,
  use,
  useEffect,
  useState,
} from "react";
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

  return (
    <UserContext.Provider
      value={{ imageUrl, setImageUrl, imagenesEquipos, setImagenesEquipos }}
    >
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
