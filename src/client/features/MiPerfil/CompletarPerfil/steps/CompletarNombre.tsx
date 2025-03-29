import { Button, TextInput } from "futbol-in-ui";
import { useState } from "react";

export const CompletarNombre = ({onSubmit}:{onSubmit:(nuevoNombre:string|null)=>void}) => {
  const [nombre, setNombre] = useState("");

  return (
    <>
      <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" />

      <span className="flex items-center gap-2">
        <Button onClick={()=>onSubmit(nombre)} label="Guardar" disabled={!nombre} size="sm" />
        <Button onClick={()=>onSubmit('')} label="Descartar" variant="neutral-outline" size="sm" />
      </span>
    </>
  );
};
