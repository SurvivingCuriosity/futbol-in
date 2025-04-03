import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO"

export const ListaParticipantes = ({competicion}:{competicion:CompeticionDTO}) => {

  return (
    <>
     <p className="my-2 text-neutral-500">Participantes:</p>
        {competicion.equipos.length === 0 ? (
          <p className="p-4 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500">
            No hay participantes
          </p>
        ) : (
          <ul>
            {competicion.equipos.map((e) => (
              <li key={e.id}>{e.id}</li>
            ))}
          </ul>
        )}
        </>
  )
}
