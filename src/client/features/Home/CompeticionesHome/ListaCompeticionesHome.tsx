import { CompeticionBaseDTO } from 'futbol-in-core/types'
import { TarjetaCompeticionHome } from './TarjetaCompeticionHome'

export const ListaCompeticionesHome = ({competiciones}:{competiciones:CompeticionBaseDTO[]}) => {
  return (
    <div>
        <p className='text-primary text-lg font-bold'>Mis competiciones</p>
        <ul className='w-full overflow-x-auto'>
            {competiciones.map((c)=>(
                <TarjetaCompeticionHome competicion={c} key={c.id}/>
            ))}
        </ul>
    </div>
  )
}
