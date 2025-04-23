import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
    <div className='mx-auto w-fit flex flex-col items-center justify-center gap-2'>
      <p className='text-3xl font-bold text-primary'>Cargando...</p>
    <Image 
      src={'futbolin-logo.svg'}
      width={70}
      height={70}
      alt="spinner"
      className='animate-spin mx-auto'
      />
      </div>
  )
}

export default loading