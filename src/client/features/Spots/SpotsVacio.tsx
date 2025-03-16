"use client"
import SearchInputCiudad from '@/client/shared/components/SearchInputCiudad'
import React from 'react'
import { UltimasBusquedasLS } from './components/UltimosSpotsLS/UltimasBusquedasLS'
import { UltimosSpotsLS } from './components/UltimosSpotsLS/UltimosSpotsLS'

export const SpotsVacio = () => {
  return (
        <div className="w-full">
          <SearchInputCiudad />
          <UltimasBusquedasLS />
          <UltimosSpotsLS />
        </div>
  )
}
