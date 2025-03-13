import { TextInput } from "futbol-in-ui";
import { AjustesBusqueda } from "./Busqueda/AjustesBusqueda";
import { AjustesPerfil } from "./Perfil/AjustesPerfil";

export const AjustesPage = () => {
  return (
    <div className="space-y-4 mt-4">
      <TextInput placeholder="Buscar..." />
      <AjustesPerfil />
      <AjustesBusqueda />
    </div>
  );
};
