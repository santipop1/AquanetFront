import React from 'react';
import './cardFranquicias.css';

interface CardFranquiciasProps {
  pretitle: string;
  title: string;
  description: string;
  imageUrl: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CardFranquicias: React.FC<CardFranquiciasProps> = ({
  pretitle,
  title,
  description,
  imageUrl,
  onPrimaryClick,
  onSecondaryClick
}) => {
  return (
    <div className="card-franquicias">
      <img src={imageUrl} alt="Card visual" className="card-franquicias-image" />
      <div className="card-franquicias-content">
        <span className="card-franquicias-pretitle">{pretitle}</span>
        <h2 className="card-franquicias-title">{title}</h2>
        <p className="card-franquicias-description">{description}</p>
        <div className="card-franquicias-buttons">
          <button className="btn-franquicias primary" onClick={onPrimaryClick}>Primary</button>
          <button className="btn-franquicias secondary" onClick={onSecondaryClick}>Secondary</button>
        </div>
        <a href="#" className="card-franquicias-link">Other link</a>
      </div>
    </div>
  );
};

export default CardFranquicias;
