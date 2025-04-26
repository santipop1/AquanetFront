'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Aquanet</h2>
          <p className="text-sm mt-2">Purificando tu futuro, un litro a la vez.</p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="font-semibold mb-2">Enlaces</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-blue-600">Inicio</Link></li>
            <li><Link href="/servicios" className="hover:text-blue-600">Servicios</Link></li>
            <li><Link href="/contacto" className="hover:text-blue-600">Contacto</Link></li>
            <li><Link href="/faq" className="hover:text-blue-600">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="font-semibold mb-2">Síguenos</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 py-4 border-t mt-4">
        © {new Date().getFullYear()} Aquanet. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
