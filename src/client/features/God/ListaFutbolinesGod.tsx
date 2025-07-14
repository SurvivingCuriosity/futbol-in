"use client";
import { SpotsClient } from "@/client/shared/client/SpotsClient";
import { SpotDTO } from "futbol-in-core/types";
import { TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";

export const ListaFutbolinesGod = ({
  futbolines,
}: {
  futbolines: SpotDTO[];
}) => {
  const [futbolinesFiltrados, setFutbolinesFiltrados] = useState<SpotDTO[]>([]);
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    setFutbolinesFiltrados(
      futbolines.filter((f) => {
        return (
          f.nombre.toLowerCase().includes(q.toLowerCase()) ||
          f.ciudad.toLowerCase().includes(q.toLowerCase()) ||
          f.tipoFutbolin.toLowerCase().includes(q.toLowerCase())
        );
      })
    );
  }, [q]);

  const handleDeleteFutbolin = async (id: string) => {
    await SpotsClient.borrarSpot(id);

  };

  return (
    <div>
      <TextInput value={q} onChangeText={setQ} placeholder="Buscar..." />
      <ul className="flex flex-col gap-2 mt-2">
        {futbolinesFiltrados.map((f) => (
          <div
            key={f.googlePlaceId + f.tipoFutbolin}
            className="border flex items-center justify-between border-neutral-800 p-1 bg-neutral-900"
          >
            <div className="flex flex-col">
              <p>{f.tipoFutbolin}</p>
              <p>{f.nombre}</p>
              <p>{f.ciudad}</p>
            </div>
            <button
              onClick={() => handleDeleteFutbolin(f.id)}
              className="p-1 bg-red-500/50 text-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
