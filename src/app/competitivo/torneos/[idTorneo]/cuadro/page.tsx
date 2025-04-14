import dynamic from 'next/dynamic';
import React from 'react'

const CuadroTorneo = dynamic(() =>
  import('@/client/features/Competiciones/Torneos/CuadroTorneo/CuadroTorneo')
);

const page = () => {
  return (
    <CuadroTorneo />
  )
}

export default page