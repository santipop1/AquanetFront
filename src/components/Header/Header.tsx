'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { ButtonText } from '@/components/ButtonText/ButtonText';

const Links = [
  { href: '/popular', label: 'Inicio' },
  { href: '/now-playing', label: 'Purifica tu futuro' },
  { href: '/top-rated', label: 'Aquanet+' }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo + Título */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </Link>
          
        </div>

        {/* Navegación */}
        <nav className="flex gap-6">
          {Links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-blue-600",
                pathname === href ? "text-blue-600 underline" : "text-gray-600",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Botones de acción */}
        <div className="flex gap-2">
        <ButtonText label="Registrarte" href="/register" size="sm"/>
        <ButtonText label="Iniciar sesión" href="/login" variant='variant2' size='sm' />

        </div>
      </div>
    </header>
  );
};

export default Header;
