import { UserService } from '@/server/services/User/UserService'
import React from 'react'

export interface OperadorPageProps {
  params: Promise<{
    idOperador: string
  }>
}

const page = async ({params}:OperadorPageProps) => {

    const {idOperador} = await params
    const operador = await UserService.getPerfilOperador(idOperador)
    

  return (
    <pre>
      {JSON.stringify(operador, null, 2)}
    </pre>
  )
}

export default page