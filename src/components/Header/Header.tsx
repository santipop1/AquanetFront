'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import './Header.css';

import { BiAdjust } from "react-icons/bi";
import { FaBell } from 'react-icons/fa';


import { UseAuth } from '@/providers/AuthProvider';
import { SymbolButton } from '../SymbolButton/SymbolButton';
import { ButtonText } from '../ButtonText/ButtonText';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown/NotificationDropdown';

const Links = [
  { href: '/', label: 'Inicio' },
  { href: '/formulario', label: 'Purifica tu futuro' },
  { href: '/dashboard', label: 'Aquanet+' }
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = UseAuth();
  const isLoggedIn = !!user;

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSymbolClick = () => {
    if (!isLoggedIn) {
      router.push('/registro');
    } else {
      setShowPopup((prev) => !prev);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setShowPopup(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full shadow-sm border-b-1 dark:bg-[#0a1643]">
      <div className="container mx-auto flex items-center justify-between px-4 py-5 header-elegante">
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
                pathname === href ? "text-blue-400 underline" : "text-white",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="relative flex gap-2 items-center pr-2">

          <button
            onClick={() => {
              const isDark = document.body.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="text-sm bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <BiAdjust />
          </button>


          <div ref={buttonRef}>
            <SymbolButton variant="user" clickFunc={handleSymbolClick} />
          </div>

          {showPopup && (
            <div
              ref={popupRef}
              className="absolute right-0 top-14 z-10 bg-white shadow-lg rounded-lg border p-4 space-y-2 w-48 flex flex-col items-center"
            >
              <ButtonText
                variant="pill-outline"
                label="Editar perfil"
                onClick={() => router.push("/edit-user")}
              />
              <ButtonText
                variant="pill-outline"
                label="Notificaciones"
                onClick={() => {}}
                icon={<FaBell />}
              />
              <ButtonText
                variant="pill-danger"
                label="Cerrar sesión"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
