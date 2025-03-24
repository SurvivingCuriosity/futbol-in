import { CompeticionesService } from '@/server/services/Competiciones/CompeticionesService';

const ListaTorneos = async () => {
    const competiciones = await CompeticionesService.getAll()
  return (
    <div>
        <ul className='flex flex-col gap-2'>
        {competiciones.map((c)=>
        <div key={c.id} className='border border-neutral-500 p-2 rounded-lg'>
            <p>Nombre: {c.nombre}</p>
            <p>Descripcion: {c.descripcion}</p>
            <p>Modalidad: {c.modalidadDeJuego}</p>
            <p>Tipo de futbolin: {c.tipoDeFutbolin}</p>
        </div>
    )}
        </ul>
    </div>
  )
}

export default ListaTorneos