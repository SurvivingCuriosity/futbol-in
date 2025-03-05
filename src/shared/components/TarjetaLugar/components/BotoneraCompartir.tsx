import { faMapLocationDot, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const BotoneraCompartir = () => {
  return (
            <div className="flex items-center gap-2 text-sm mb-4">
              <button className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900">
                <FontAwesomeIcon icon={faShare} />
              </button>
    
              <button className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900">
                <FontAwesomeIcon icon={faMapLocationDot} />
              </button>
            </div>
  )
}
