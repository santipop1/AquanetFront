'use client';

import React from 'react';

interface ButtonTextLogoutProps {
  label: string;
  onClick?: () => void;
}

export const ButtonTextLogout = ({ label, onClick }: ButtonTextLogoutProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white text-sm font-medium px-5 py-2 rounded-full transition hover:bg-red-600 hover:shadow w-full text-center"
    >
      {label}
    </button>
  );
};
