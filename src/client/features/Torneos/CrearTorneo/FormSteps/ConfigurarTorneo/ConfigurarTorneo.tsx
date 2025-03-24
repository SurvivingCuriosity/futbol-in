import cuadro16 from '@/client/shared/assets/img/torneos/cuadros/16.svg'
import cuadro32 from '@/client/shared/assets/img/torneos/cuadros/32.svg'
import cuadro64 from '@/client/shared/assets/img/torneos/cuadros/64.svg'
import { useState } from 'react'

import Image, { StaticImageData } from 'next/image'
import { FormCantidadParejas } from '../../components/FormCantidadParejas'
import { FormEnfrentamientos } from '../Enfrentamientos/FormEnfrentamientos'
export const ConfigurarTorneo = () => {
  
  const [cantidadParejas, setCantidadParejas] = useState<number>(16)

  const imagenCuadroMap:Record<number, StaticImageData> = {
    16: cuadro16,
    32: cuadro32,
    64: cuadro64
  }

  return (
    <div>
      <FormCantidadParejas onChange={setCantidadParejas} />
      <FormEnfrentamientos onUpdate={()=>{}} esTorneo={true} />
      <Image src={imagenCuadroMap[cantidadParejas]} alt="cuadro" width={600} height={200} />
    </div>
  )
}
