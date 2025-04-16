import { FutbolinesOperadorPage } from '@/client/features/Perfil/Operador/FutbolinesOperador/FutbolinesOperadorPage'
import { SpotService } from '@/server/services/Spots/SpotsService'
import React from 'react'

export interface OperadorPageProps {
    params: Promise<{
      idOperador: string
    }>
  }

const page = async ({params}:OperadorPageProps) => {

    const {idOperador} = await params

    const fubtolines = await SpotService.getSpotsDeOperador(idOperador)
    
  return (
    <FutbolinesOperadorPage futbolines={fubtolines} />
  )
}

export default page