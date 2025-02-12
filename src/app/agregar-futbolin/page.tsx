"use client"

import PalcesAutocompleteInput from '@/components/PlacesAutocompleteInput'
import React from 'react'
import {Button} from 'futbol-in-ui' 

const page = () => {
  return (
    <div>
        <PalcesAutocompleteInput 
            onSelect={(selected) => {
                console.log(selected)
            }}
        />
        <Button label="Agregar" size='sm' variant='danger'/>
    </div>
  )
}

export default page
