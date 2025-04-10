"use client"
import { SearchInputRedirect } from '../Landing/components/SearchInputRedirect'
import { UltimasBusquedasLS } from './components/UltimosSpotsLS/UltimasBusquedasLS'
import { UltimosSpotsLS } from './components/UltimosSpotsLS/UltimosSpotsLS'

export const SpotsVacio = () => {
  return (
        <div className="w-full">
          <SearchInputRedirect />
          <UltimasBusquedasLS />
          <UltimosSpotsLS />
        </div>
  )
}
