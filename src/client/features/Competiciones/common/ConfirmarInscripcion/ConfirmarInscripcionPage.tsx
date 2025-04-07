"use client";

import { TarjetaEquipo } from "@/client/features/MiPerfil/components/TarjetaEquipo";
import { LigasClient } from "@/client/shared/client/LigasClient";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { EquipoCompeticionDTO } from "@/server/models/Equipo/EquipoCompeticion.model";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { Button } from "futbol-in-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChipEstadoInscripcion } from "../ChipInscripcion";

export interface ConfirmarInscripcionPage {
  equiposUsuario: EquipoDTO[];
  idCompeticion: string;
  equipoInscrito: EquipoCompeticionDTO|undefined;
  tipoInscripcion:TipoInscripcion
  tipoCompeticion: TipoCompeticion;
}

export const ConfirmarInscripcionPage = (props: ConfirmarInscripcionPage) => {
  const {
    idCompeticion,
    equiposUsuario,
    equipoInscrito,
    tipoInscripcion,
    tipoCompeticion
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
    console.log(tipoCompeticion)
    if(tipoCompeticion === TipoCompeticion.LIGA){
      const res = await LigasClient.joinLiga({
        idLiga:idCompeticion,
        idEquipo: idEquipoSeleccionado,
      });
      if (res.success) {
        toast.success("¡Bienvenido a la competición!");
        router.refresh();
      }
    }
    // const res = await CompeticionesClient.join({
    //   idCompeticion,
    //   idEquipo: idEquipoSeleccionado,
    // });
    // if (res.success) {
    //   toast.success("¡Bienvenido a la competición!");
    //   router.refresh();
    // }
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
        <ChipEstadoInscripcion equipoInscrito={equipoInscrito} tipoInscripcion={tipoInscripcion} />
      )}
    </div>
  );
};
