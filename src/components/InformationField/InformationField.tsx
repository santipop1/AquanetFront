"use client";

import React, { useRef, useState } from 'react';
import './InformationField.css';
import { SymbolButton } from '../SymbolButton/SymbolButton';

export interface InformationFieldProps {
  variant: 'text' | 'date' | 'select' | 'password' | 'readonly';
  label: string;
  value?: string;
  placeholder?: string;
  options?: string[]; // solo para select
  onChange?: (value: string) => void;
}

export const InformationField: React.FC<InformationFieldProps> = ({
  variant,
  label,
  value = '',
  placeholder = '',
  options = [],
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const openDatePicker = () => {
    dateInputRef.current?.showPicker?.();
  };

  const openSelect = () => {
    selectRef.current?.showPicker?.();
  };

  return (
    <div className="fieldContainer">
      <label className="label">{label}</label>

      {/* Text */}
      {variant === 'text' && (
        <input
          type="text"
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}

      {/* Date */}
      {variant === 'date' && (
        <div className="inputWithButton">
          <input
            type="date"
            ref={dateInputRef}
            className="input noNativeIcon"
            value={value}
            onChange={handleChange}
          />
          <SymbolButton variant="calendar" clickFunc={openDatePicker} />
        </div>
      )}

      {/* Select */}
      {variant === 'select' && (
        <div className="inputWithButton">
          <select
            ref={selectRef}
            className="input noNativeIcon"
            value={value}
            onChange={handleChange}
          >
            <option disabled value="">
              --Seleccionar--
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <SymbolButton variant="arrow-down" clickFunc={openSelect} />
        </div>
      )}

      {/* Password */}
      {variant === 'password' && (
        <div className="inputWithButton">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          <SymbolButton
            variant={showPassword ? 'closed-eye' : 'opened-eye'}
            clickFunc={toggleShowPassword}
          />
        </div>
      )}

      {/* Readonly */}
      {variant === 'readonly' && (
        <input
          type="text"
          className="input readonly"
          value={value}
          readOnly
        />
      )}
    </div>
  );
};
