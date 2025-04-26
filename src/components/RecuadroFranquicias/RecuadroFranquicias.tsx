import React from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import "./RecuadroFranquicias.css";

export interface RecuadroFranquiciasProps {
  nombre: string;
  onEditar?: () => void;
  logoSrc?: string;
}

const RecuadroFranquicias = ({ nombre, onEditar, logoSrc }: RecuadroFranquiciasProps) => {
  return (
    <div className="recuadro-franquicia">
      <Image
        src={logoSrc || "/gotita.png"}
        alt="Logo de franquicia"
        width={24}
        height={24}
        className="recuadro-logo"
      />
      <span className="recuadro-nombre">{nombre}</span>
      <button
        onClick={onEditar}
        className="recuadro-boton"
        aria-label="Editar franquicia"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
};

export default RecuadroFranquicias;
