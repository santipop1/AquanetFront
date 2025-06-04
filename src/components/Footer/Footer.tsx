'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo + descripción */}
        <div className="footer-section">
          <div className="footer-logo">
            <Image src="/logo.png" alt="Aquanet Logo" width={160} height={60} />
          </div>
          <p>Purificando tu futuro, un litro a la vez.</p>
        </div>

        {/* Enlaces */}
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul className="footer-links">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/faq">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h3>Síguenos</h3>
          <ul className="footer-social">
            <li><a href="https://facebook.com" target="_blank"><FaFacebookF /></a></li>
            <li><a href="https://twitter.com" target="_blank"><FaXTwitter /></a></li>
            <li><a href="https://instagram.com" target="_blank"><FaInstagram /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Aquanet. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
