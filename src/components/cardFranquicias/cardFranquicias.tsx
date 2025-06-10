import React, { useState } from 'react';
import './cardFranquicias.css';

interface CardFranquiciasProps {
  title: string;
  brand: string;
  year: string;
  description: string;
  imageUrl: string;
  price?: string;
  size?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CardFranquicias: React.FC<CardFranquiciasProps> = ({
  title,
  brand,
  year,
  description,
  imageUrl,
  price,
  size,
  isActive,
  onClick
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={"card-franquicias" + (isActive ? " card-franquicias-active" : "")} onClick={onClick}>
        <img src={imageUrl} alt={`${title} Poster`} className="card-franquicias-image" />
        <div className="card-franquicias-content">
          <h2 className="card-franquicias-title">{title}</h2>
          <p className="card-franquicias-brand">Marca: {brand}</p>
          <button className="card-franquicias-button" onClick={e => { e.stopPropagation(); setShowModal(true); }}>
            Mostrar más información
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{title}</h3>
            <p><strong>Marca:</strong> {brand}</p>
            <p><strong>Año:</strong> {year}</p>
            <p className="modal-description">{description}</p>
            <p><strong>Precio:</strong> {price}</p>
            <p><strong>Tamaño:</strong> {size}</p>
            <button className="modal-close" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardFranquicias;
