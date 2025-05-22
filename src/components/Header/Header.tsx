'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown/NotificationDropdown';

const Links = [
  { href: '/popular', label: 'Inicio' },
  { href: '/now-playing', label: 'Purifica tu futuro' },
  { href: '/top-rated', label: 'Aquanet+' }
];

const Header = () => {
  const pathname = usePathname();

  return (
<<<<<<< Updated upstream
    <header className="w-full border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo + Título */}
=======
    <header className="w-full border-b-2 shadow-sm z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
>>>>>>> Stashed changes
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </Link>
        </div>

<<<<<<< Updated upstream
        {/* Navegación */}
        <nav className="flex gap-6">
=======
        <nav className="flex items-center gap-8">
>>>>>>> Stashed changes
          {Links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
<<<<<<< Updated upstream
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === href ? "text-blue-600 underline" : "text-gray-600",
=======
                "text-xl hover:text-blue-400 hover:-translate-y-1 transition-all",
                pathname === href ? "text-blue-400 underline" : "text-gray-700"
>>>>>>> Stashed changes
              )}
            >
              {label}
            </Link>
          ))}
          <NotificationDropdown />
        </nav>
<<<<<<< Updated upstream

        {/* Botones de acción */}
        <div className="flex gap-2">
        <ButtonText label="Registrarte" href="/register" size="sm"/>
        <ButtonText label="Iniciar sesión" href="/login" variant='variant2' size='sm' />

        </div>
=======
>>>>>>> Stashed changes
      </div>
    </header>
  );
};

export default Header;
