import { LogrosPage } from '@/features/Logros/LogrosPage'
import { NavLayout } from '@/shared/components/Layouts/NavLayout'
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async () => {
  
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <LogrosPage />
    </NavLayout>
  )
}

export default page