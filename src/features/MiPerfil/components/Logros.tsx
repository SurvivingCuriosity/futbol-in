import React from 'react'
import { ProgresoLogro } from './ProgresoLogro'
import { LOGROS_DISPONIBLES } from '@/shared/constants/LogrosDisponibles'
import Link from 'next/link'
import { UserDTO } from '@/shared/models/User/UserDTO'

export const Logros = ({user}: {user: UserDTO}) => {

    const futbolinesAgregados = user.stats.lugaresAgregados;

  return (
    <div className="grow p-3 bg-neutral-900 rounded-lg">
    <p className="mb-2 text-xl">Logros</p>
    <div className="space-y-4">
      <ProgresoLogro
        logro={LOGROS_DISPONIBLES[0]}
        value={futbolinesAgregados}
      />
    </div>
    <Link
      href={"/logros"}
      className="text-right block text-sm text-neutral-500 mt-2 underline underline-offset-2"
    >
      Ver todos los logros disponibles
    </Link>
  </div>
  )
}
