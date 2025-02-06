import Link from 'next/link'

export const TopNav = () => {
  return (
    <div className='w-full h-16 bg-orange-900 shadow-lg shadow-black avsol top-0 flex items-center justify-center'>
        <div className='max-w-screen-lg flex items-center justify-between mx-auto w-full p-2 px-4'>
            <Link href='/' className='font-extrabold text-white text-2xl'>Futbol In</Link>
            <button className='flex flex-col items-center justify-center gap-2'>
                <span className='w-6 h-0.5 bg-white'></span>
                <span className='w-6 h-0.5 bg-white'></span>
                <span className='w-6 h-0.5 bg-white'></span>
            </button>
        </div>
    </div>
  )
}
