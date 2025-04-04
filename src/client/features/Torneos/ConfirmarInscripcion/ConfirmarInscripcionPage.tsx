"use client";

import { CompeticionesClient } from "@/client/shared/client/CompeticionesClient";
import { EquipoInscritoDTO } from "@/server/models/Competicion/CompeticionDTO";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { Button } from "futbol-in-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { TarjetaEquipo } from "../../MiPerfil/components/TarjetaEquipo";
import { ChipEstadoInscripcion } from "../ListaTorneos/ChipInscripcion";

export interface ConfirmarInscripcionPage {
  equiposUsuario: EquipoDTO[];
  idCompeticion: string;
  equipoInscrito: EquipoInscritoDTO;
}

export const ConfirmarInscripcionPage = (props: ConfirmarInscripcionPage) => {
  const {
    idCompeticion,
    equiposUsuario,
    equipoInscrito,
  } = props;

  const router = useRouter();

  const [idEquipoSeleccionado, setIdEquipoSeleccionado] = useState<
    string | undefined
  >(undefined);

  if (equiposUsuario.length === 0)
    return (
      <div className="p-10 mx-auto flex flex-col items-center">
        <p className="text-neutral-500">No tienes equipos</p>
        <Link href={`/perfil/crear-equipo`}>Crear equipo</Link>
      </div>
    );

  const handleElegirEquipo = (idEquipo: string | undefined) => {
    setIdEquipoSeleccionado(idEquipo);
  };

  const handleInscribirme = async () => {
    if (!idEquipoSeleccionado) return;
    const res = await CompeticionesClient.joinCompeticion({
      idCompeticion,
      idEquipo: idEquipoSeleccionado,
    });
    if (res.success) {
      toast.success("¡Bienvenido a la competición!");
      router.refresh();
    }
  };

  return (
    <div className="p-2 w-full space-y-4">
      <p className="text-neutral-500 mb-2">Elige un equipo</p>
      <ul>
        {equiposUsuario.map((e) => (
          <TarjetaEquipo
            equipo={e}
            key={e.id}
            onClick={() =>
              handleElegirEquipo(
                idEquipoSeleccionado === e.id ? undefined : e.id
              )
            }
            selected={idEquipoSeleccionado === e.id}
          />
        ))}
      </ul>
      <Button
        label={`Inscribirme`}
        onClick={handleInscribirme}
        disabled={idEquipoSeleccionado === undefined}
      />
      {!equipoInscrito && (
        <ChipEstadoInscripcion equipoInscrito={equipoInscrito} />
      )}
    </div>
  );
};
