import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import { Button } from "futbol-in-ui";
import { useState } from "react";

export const CompletarCiudad = ({onSubmit}:{onSubmit:(nuevoTelefono:string|null)=>void}) => {
  const [ciudad, setCiudad] = useState("");


  return (
    <>
      <span className="flex items-center gap-2">
        <span className="w-full grow z-20">
          <SearchInputMunicipios onSelect={setCiudad}/>
        </span>
      </span>
      <span className="flex items-center gap-2">
        <Button onClick={()=>onSubmit(ciudad)} label="Guardar" disabled={!ciudad} size="sm" />
        <Button onClick={()=>onSubmit('')} label="Descartar" variant="neutral-outline" size="sm" />
      </span>
    </>
  );
};
