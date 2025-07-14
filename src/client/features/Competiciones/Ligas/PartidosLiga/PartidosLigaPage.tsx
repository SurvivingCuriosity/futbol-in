"use client";
import { EnfrentamientoDTO } from "futbol-in-core/types";
import { TextInput } from "futbol-in-ui";
import { use, useState } from "react";
import { DetalleLigaContext } from "../DetalleLiga/DetalleLigaContext";
import { TarjetaEnfrentamiento } from "./TarjetaEnfrentamiento";

export const PartidosLigaPage = () => {

  const {equipos, enfrentamientos} = use(DetalleLigaContext)

  const [q, setQ] = useState("");

  const [enfrentamientosFiltrados, setEnfrentamientosFiltrados] = useState<EnfrentamientoDTO[]>(enfrentamientos);

  const handleFilter = (texto: string) => {
    // 1) Guardamos el texto en el estado 'q'
    setQ(texto);

    const busqueda = texto.toLowerCase().trim();

    // Si la búsqueda está vacía, restauramos todos los enfrentamientos
    if (!busqueda) {
      setEnfrentamientosFiltrados(enfrentamientos);
      return;
    }

    // 2) Filtramos los enfrentamientos donde equipoA o equipoB coincida
    const resultado = enfrentamientos.filter((enf) => {
      // Buscar los objetos 'equipoA' y 'equipoB'
      const eqA = equipos.find((eq) => eq.id === enf.equipoA);
      const eqB = equipos.find((eq) => eq.id === enf.equipoB);

      // Obtenemos los nombres en minúsculas
      const nombreA = eqA?.nombreEquipo?.toLowerCase() || "";
      const nombreB = eqB?.nombreEquipo?.toLowerCase() || "";

      // Retornamos true si alguno incluye la cadena 'busqueda'
      return nombreA.includes(busqueda) || nombreB.includes(busqueda);
    });

    // 3) Guardamos el resultado en el estado
    setEnfrentamientosFiltrados(resultado);
  };

  return (
   <>
      <div className="my-2">
        <TextInput value={q} onChangeText={handleFilter} placeholder="Buscar..."/>
        {enfrentamientosFiltrados.length === 0 && <p className="p-4 rounded-lg flex items-center justify-center text-neutral-500">No hay partidos</p>}
      </div>
      <ul className="space-y-2 mt-2">
        {enfrentamientosFiltrados.map((p) => (
          <TarjetaEnfrentamiento
            key={p.equipoA + p.equipoB}
            enfrentamiento={p}
            equipoA={equipos.find((e) => e.id === p.equipoA)}
            equipoB={equipos.find((e) => e.id === p.equipoB)}
          />
        ))}
      </ul>
      </>
  );
};
