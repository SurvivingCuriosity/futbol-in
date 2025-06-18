import { TextInput } from "futbol-in-ui";
import { AjustesBusqueda } from "./Busqueda/AjustesBusqueda";
import { AjustesPerfil } from "./Perfil/AjustesPerfil";

export const AjustesPage = () => {
  return (
    <p className="text-center text-sm text-neutral-500 p-10">Ups... aún no hay nada que ajustar</p>
  )
  return (
    <div className="space-y-4 mt-4">
      <TextInput placeholder="Buscar..." />
      <AjustesPerfil />
      <AjustesBusqueda />
    </div>
  );
};
