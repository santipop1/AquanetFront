'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown/NotificationDropdown';


const Links = [
  { href: '/popular', label: 'Inicio' },
  { href: '/formulario', label: 'Purifica tu futuro' },
  { href: '/login', label: 'Aquanet+' }
];

const Header = () => {
  const pathname = usePathname();

  return (


    <header className="w-full border-b-2 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">

        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </Link>
        </div>


        <nav className="flex gap-10">
          {Links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(

                "text-xl hover:text-blue-400 hover:-translate-y-1 duration-300",
                pathname === href ? "text-blue-400 underline" : "text-gray-700",
              )}
            >
              {label}
            </Link>
          ))}
          <NotificationDropdown />
        </nav>

        <div className="flex gap-2">
          <Link href={'/registro'} className='bg-stone-300 rounded-xl px-6 py-4 text-stone-800 hover:bg-stone-400 duration-300'>Registrate</Link>
          <Link href={'/login'} className='bg-blue-300 rounded-xl px-6 py-4 text-white hover:bg-blue-400 duration-300'>Iniciar Sesion</Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
