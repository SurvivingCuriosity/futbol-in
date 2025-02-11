import { faBookmark, faCirclePlus, faHome, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export const BottomNav = () => {

    const items = [
        {label: 'Home', href: '/', icon: faHome},
        {label: 'Home', href: '/mapa', icon: faMagnifyingGlass},
        {label: 'Home', href: '/agregar-futbolin', icon: faCirclePlus},
        {label: 'Home', href: '/', icon: faBookmark},
        {label: 'Home', href: '/', icon: faUser},
    ]

  return (
    <menu className='fixed bottom-0 w-full h-16 bg-orange-500 flex justify-around items-center'>
        {items.map((item, index) => (
            <Link href={item.href} key={`${item.icon}${index}`} className='p-2'>
                <FontAwesomeIcon icon={item.icon} width={24} height={24} className='text-white'/>
            </Link>
        ))}
    </menu>
  )
}
