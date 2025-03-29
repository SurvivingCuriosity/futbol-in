import React from 'react'

export const TarjetaCompletarPerfil = ({titulo, children}:{titulo?:string, children:React.ReactNode}) => {
  return (
    <div className='bg-neutral-900 w-11/12 max-w-[500px] p-3 border border-neutral-800 shrink-0 snap-center flex flex-col justify-between gap-2 rounded-lg'>
        <p className='text-sm text-neutral-300'>{titulo}</p>
        {children}
    </div>
  )
}
