'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown/NotificationDropdown';
import { ButtonText } from '../ButtonText/ButtonText';
import { SymbolButton } from '../SymbolButton/SymbolButton';
import { UseAuth } from '@/providers/AuthProvider';
import { useEffect, useState, useRef } from 'react';


const Links = [
  { href: '/', label: 'Inicio' },
  { href: '/formulario', label: 'Purifica tu futuro' },
  { href: '/login', label: 'Aquanet+' }
];

const Header = () => {
  const pathname = usePathname();
  const { user } = UseAuth();
  const router = useRouter();

  {/*
    const isLoggedIn = user ? true : false;
    */}

  const isLoggedIn = true;

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSymbolClick = () => {
    if(showPopup) {
      setShowPopup(false);
      return;
    } 
    if (!isLoggedIn) {
      router.push('/registro');
    } else {
      setShowPopup(prev => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }
      setShowPopup(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full shadow-sm border-b-1">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">

        <div className="flex items-center gap-2 pl-2">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={180} height={180} />
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
        </nav>

        <div className="relative flex gap-2 items-center pr-2">

          <div ref={buttonRef}>
            <SymbolButton variant='user' clickFunc={handleSymbolClick}/>
          </div>

          {showPopup && (
            <div ref={popupRef} className="absolute right-0 top-14 z-10 bg-white shadow-lg rounded-lg border p-4 space-y-2 w-48 flex flex-col items-center">
              <ButtonText variant='variant2' label='Editar perfil' onClick={() => router.push("/edit-user")} minW={40}/>
              <NotificationDropdown/>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;