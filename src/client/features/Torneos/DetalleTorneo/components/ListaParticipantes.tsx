import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO"
import { TarjetaEquipoTorneo } from "./TarjetaEquipoTorneo"

export const ListaParticipantes = ({equipos}:{equipos:EquipoDTO[]}) => {

  return (
    <>
        {equipos.length === 0 ? (
          <p className="p-4 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500">
            No hay participantes
          </p>
        ) : (
          <ul className="w-full space-y-2">
            {equipos.map((e) => (
              <TarjetaEquipoTorneo equipo={e} key={e.id}/>
            ))}
          </ul>
        )}
        </>
  )
}
