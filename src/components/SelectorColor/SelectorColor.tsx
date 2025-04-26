import React, { useRef, useState } from "react";
import "./SelectorColor.css";

const SelectorColor = () => {
  const [color, setColor] = useState("#3470b7");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClickGota = () => {
    colorInputRef.current?.click(); // esto abre el popup
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="selector-container">
      <h3 className="selector-titulo">Logo</h3>

      {/* Gota que dispara el selector */}
      <svg
        className="selector-gota"
        viewBox="0 0 64 64"
        fill={color}
        onClick={handleClickGota}
      >
        <path d="M32 2C24 14 10 26 10 42a22 22 0 0044 0C54 26 40 14 32 2z" />
      </svg>

      {/* input oculto que lanza el popup */}
      <input
        type="color"
        ref={colorInputRef}
        value={color}
        onChange={handleColorChange}
        className="selector-color-hidden"
      />

      <button className="selector-aceptar">Aceptar</button>
    </div>
  );
};

export default SelectorColor;
