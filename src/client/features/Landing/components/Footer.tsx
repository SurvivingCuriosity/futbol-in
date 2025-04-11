import { AppLogo } from '@/client/shared/components/AppLogo'
import Link from 'next/link'

export const Footer = () => {
  return (
    

<footer className="bg-neutral-950 rounded-lg shadow-sm mb-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0 justify-start">
                <AppLogo />
            </div>
            <ul className="flex flex-col md:flex-row mb-6 text-sm font-medium text-neutral-500 sm:mb-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <Link href="/politica-de-privacidad" className="hover:underline me-4 md:me-6">Política de privacidad</Link>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-neutral-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-neutral-500 sm:text-center">© 2025 <a href="https://flowbite.com/" className="hover:underline">Futbol-in™</a> Todos los derechos reservados.</span>
    </div>
</footer>


  )
}
