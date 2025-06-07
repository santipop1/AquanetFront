'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { UseAuth } from '@/providers/AuthProvider';
import { SymbolButton } from '../SymbolButton/SymbolButton';
import { ButtonText } from '../ButtonText/ButtonText';
import { NotificationDropdown } from '@/components/Notifications/NotificationDropdown/NotificationDropdown';
import './Header.css';

const Links = [
  { href: '/', label: 'Inicio' },
  { href: '/formulario', label: 'Purifica tu futuro' },
  { href: '/dashboard', label: 'Aquanet+' }
];

export default function HeaderMini() {
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header-mini">
      <div className="logo">
        <Link href="/">
          <Image src="/aquanetblack.png" alt="Logo Aquanet" width={150} height={60} />
        </Link>
      </div>
      <nav className="nav-links">
        {Links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'active' : ''}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="actions" ref={buttonRef}>
        <SymbolButton variant="user" clickFunc={handleSymbolClick} />
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
          <NotificationDropdown />
          <ButtonText
            variant="pill-danger"
            label="Cerrar sesión"
            onClick={handleLogout}
          />
        </div>
        )}
      </div>
    </div>
  );
}