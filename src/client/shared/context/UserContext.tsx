"use client";

import React, {
  createContext,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useGetLoggedInUserClient } from "../hooks/useGetLoggedInUserClient";
import { UserClient } from "../client/UserClient";

type UserContextType = {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [imageUrl, setImageUrl] = useState<string>("");

  const user = useGetLoggedInUserClient();

  const getImageUrl = useCallback(async () => {
    if (!user) return "";
    return await UserClient.getUserImageUrl(user.imagen);
  }, [user]);

  useEffect(() => {
    getImageUrl().then((url) => setImageUrl(url || ""));
  }, [getImageUrl]);

  return (
    <UserContext.Provider value={{ imageUrl, setImageUrl }}>
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
