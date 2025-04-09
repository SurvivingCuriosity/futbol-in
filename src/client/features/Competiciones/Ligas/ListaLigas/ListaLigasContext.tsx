"use client";

import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { UserDTO } from "@/server/models/User/UserDTO";
import { createContext } from "react";

export interface ListaLigasContext {
  ligas: LigaDTO[];
  loggedInUser: UserDTO | undefined;
  equiposUsuario: EquipoDTO[];
}

export const ListaLigasContext = createContext<ListaLigasContext>({
  ligas: [],
  loggedInUser: undefined,
  equiposUsuario: [],
});

export const ListaLigasProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ListaLigasContext;
}) => {
  return (
    <ListaLigasContext.Provider value={value}>
      {children}
    </ListaLigasContext.Provider>
  );
};
