"use client";

import { LigaDTO } from "futbol-in-core/types";
import { EquipoDTO } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
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
