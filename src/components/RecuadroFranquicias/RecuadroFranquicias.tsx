import React from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./RecuadroFranquicias.css";

export interface RecuadroFranquiciasProps {
  nombre: string;
  logoSrc?: string;
  onClick?: () => void;
}

const RecuadroFranquicias = ({ nombre, logoSrc, onClick }: RecuadroFranquiciasProps) => {
  return (
    <div className="recuadro-franquicia" onClick={onClick}>
      <Image
        src={logoSrc || "/gotita.png"}
        alt="Logo de franquicia"
        width={24}
        height={24}
        className="recuadro-logo"
      />
      <span className="recuadro-nombre">{nombre}</span>
      <Link
        href="/editar-franquicia"
        className="recuadro-boton"
        onClick={(e) => e.stopPropagation()}
        aria-label="Editar franquicia"
      >
        <Pencil size={18} />
      </Link>
    </div>
  );
};

export default RecuadroFranquicias;
