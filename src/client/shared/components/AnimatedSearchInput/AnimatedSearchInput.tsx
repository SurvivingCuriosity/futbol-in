import React, { useState } from 'react'
import SearchInputCiudad from '../SearchInputCiudad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

export const AnimatedSearchInput = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex items-center gap-2 w-full min-w-[300px] z-5'>
        <span className={`transition-all duration-500 ${isOpen ? 'w-full' : 'w-0 h-0 overflow-hidden'}`}>
            <SearchInputCiudad />
        </span>
        <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faXmark : faSearch} className="w-6 h-6" />
        </button>
    </div>
  )
}
