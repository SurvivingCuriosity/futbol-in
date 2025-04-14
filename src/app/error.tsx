'use client' // Error boundaries must be Client Components
 
import { TarjetaMensaje } from '@/client/shared/components/TarjetaMensaje'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='w-full h-full flex-col items-center justify-center p-10 pt-20 relative max-w-xl mx-auto'>
      <h2 className='text-3xl font-bold mb-2'>Ups... algo salió mal</h2>
      <FontAwesomeIcon icon={faSadCry} className='text-9xl text-neutral-600 opacity-20 absolute top-0 right-0 -rotate-12' />
      <TarjetaMensaje 
        text='Intenta recargar la página, si el problema persiste, manda un correo a soporte@futbolin.app'
        variant='error'
      />
    </div>
  )
}