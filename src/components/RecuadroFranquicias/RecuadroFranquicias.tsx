import React from "react";
import Image from "next/image";
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
    </div>
  );
};

export default RecuadroFranquicias;
