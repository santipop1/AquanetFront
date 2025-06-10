import React, { ReactNode } from "react";
import Image from "next/image";
import "./RecuadroFranquicias.css";

export interface RecuadroFranquiciasProps {
  nombre: string | ReactNode;
  logoSrc?: string;
  onClick?: () => void;
}

const RecuadroFranquicias = ({ nombre, logoSrc, onClick }: RecuadroFranquiciasProps) => {
  const isString = typeof nombre === 'string';

  return (
    <div className="recuadro-franquicia" onClick={onClick}>
      {isString && (
        <Image
          src={logoSrc || "/gotita.png"}
          alt="Logo de franquicia"
          width={24}
          height={24}
          className="recuadro-logo"
        />
      )}
      <span className={`recuadro-nombre ${!isString ? 'recuadro-nombre-center' : ''}`}>
        {nombre}
      </span>
    </div>
  );
};

export default RecuadroFranquicias;
