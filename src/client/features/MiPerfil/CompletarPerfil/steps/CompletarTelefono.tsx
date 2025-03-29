import { Button, TextInput } from "futbol-in-ui";
import { useState } from "react";

export const CompletarTelefono = ({onSubmit}:{onSubmit:(nuevoTelefono:string|null)=>void}) => {
  const [nombre, setNombre] = useState("");


  return (
    <>
      <p className="text-xs text-neutral-500 leading-4">
        No se mostrará en tu perfil. Se utilizará para contactarte si te apuntas
        a torneos.
      </p>

      <span className="flex items-center gap-2">
        <span className="w-full grow">
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Teléfono"
          />
        </span>
      </span>
      <span className="flex items-center gap-2">
        <Button onClick={()=>onSubmit(nombre)} label="Guardar" disabled={!nombre} size="sm" />
        <Button onClick={()=>onSubmit('')} label="Descartar" variant="neutral-outline" size="sm" />
      </span>
    </>
  );
};
