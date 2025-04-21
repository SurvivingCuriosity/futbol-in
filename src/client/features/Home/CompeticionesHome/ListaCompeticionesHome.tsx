import { CompeticionBaseDTO } from '@/server/models/Competicion/CompeticionBase/CompeticionBaseDTO'

export const ListaCompeticionesHome = ({competiciones}:{competiciones:CompeticionBaseDTO[]}) => {
  return (
    <div>
        <p className='text-primary text-lg font-bold'>Mis competiciones</p>
        <ul className='w-full overflow-x-auto'>
            {competiciones.map((c)=>(
                <li key={c.id} className='w-11/12 border p-2 rounded-lg bg-neutral-900 border-neutral-800'>
                    <p>{c.nombre}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
