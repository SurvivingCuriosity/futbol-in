import Link from 'next/link'
import React from 'react'

export const MarcadorPuntuacion = () => {
  return (
    <div className='border border-neutral-800 bg-neutral-900 p-3 px-4 rounded-lg'>
        <p className='text-neutral-400'>Nivel no asignado aún <span className='text-primary font-bold'></span></p>
        <Link href="/tabla-puntuacion" className={'tabla-puntuacion text-neutral-600 text-xs underline underline-offset-3'}>Ver tabla de puntuación</Link>
    </div>
  )
}
