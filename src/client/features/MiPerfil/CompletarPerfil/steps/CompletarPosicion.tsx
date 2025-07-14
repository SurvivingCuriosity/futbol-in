import { Posicion } from "futbol-in-core/enum";
import { Button } from "futbol-in-ui";
import { useState } from "react";

const opciones = [
  { id: 0, value: Posicion.DELANTERO },
  { id: 1, value: Posicion.PORTERO },
  { id: 2, value: Posicion.POLIVALENTE },
];

export const CompletarPosicion = ({onSubmit}:{onSubmit:(nuevaPosicion:Posicion|null)=>void}) => {
  const [posicion, setPosicion] = useState<Posicion | null>(null);

  return (
    <>
      <div className="flex items-center gap-2 text-sm mb-2">
        {opciones.map((opcion) => (
          <span
            onClick={() => setPosicion(opcion.value)}
            key={opcion.id}
            className="w-1/3 p-1 bg-neutral-800 text-center rounded-lg relative"
          >
            {posicion === opcion.value && (
              <div className="bg-green-400 text-xs absolute -top-1 -right-1 rounded-full size-4">
                ✓
              </div>
            )}
            {opcion.value}
          </span>
        ))}
      </div>
      <span className="flex items-center gap-2">
        <Button onClick={()=>onSubmit(posicion)} label="Guardar" disabled={!posicion} size="sm" />
        <Button onClick={()=>onSubmit(Posicion.NOT_SET)} label="Descartar" variant="neutral-outline" size="sm" />
      </span>
    </>
  );
};
