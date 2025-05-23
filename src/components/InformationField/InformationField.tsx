"use client";

import React, { useRef, useState, useEffect } from 'react';
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
  value,
  placeholder = '',
  options = [],
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
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

  if (internalValue === null) {
    return null;
  }

  return (
    <div className="fieldContainer">
      <label className="label">{label}</label>

      {/* Text */}
      {variant === 'text' && (
        <input
          type="text"
          className="input"
          placeholder={placeholder}
          value={internalValue}
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
            value={internalValue}
            onChange={handleChange}
          />
          <SymbolButton variant="calendar" onClick={openDatePicker}/>
        </div>
      )}

      {/* Select */}
      {variant === 'select' && (
        <div className="inputWithButton">
          <select
            ref={selectRef}
            className="input noNativeIcon"
            value={internalValue}
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
          <SymbolButton
            variant="arrow-down" 
            onClick={openSelect}
          />
        </div>
      )}

      {/* Password */}
      {variant === 'password' && (
        <div className="inputWithButton">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input"
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
          />
          <SymbolButton
            variant={showPassword ? 'closed-eye' : 'opened-eye'}
            onClick={toggleShowPassword}
          />
        </div>
      )}

      {/* Readonly */}
      {variant === 'readonly' && (
        <input
          type="text"
          className="input readonly"
          value={internalValue}
          readOnly
        />
      )}
    </div>
  );
};
