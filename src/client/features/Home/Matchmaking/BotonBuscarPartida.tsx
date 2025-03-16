import React from 'react'

export const BotonBuscarPartida = ({onClick}:{onClick:()=>void}) => {

  return (
    <button onClick={onClick} className='bg-primary text-neutral-900 px-4 py-2 rounded-lg w-fit'>
        Buscar partida
    </button>
  )
}
