import { Spinner } from '@/client/shared/components/Spinner'
import React from 'react'

const loading = () => {
  return (
    <div className='w-fit mx-auto p-10'>
      <Spinner />
    </div>
  )
}

export default loading