import React from 'react';
import Link from 'next/link';
import './ButtonText.css';

export interface ButtonTextProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'variant1' | 'variant2' | 'variant3' | 'variant4' | 'variant5';
  size?: 'sm' | 'md' | 'lg'; 
}


export const ButtonText = ({
  label,
  onClick,
  href,
  variant = 'variant1',
  size = 'md',
}: ButtonTextProps) => {
  const className = `button-text ${variant} size-${size}`;


  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};
