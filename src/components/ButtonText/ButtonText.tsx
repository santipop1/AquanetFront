import React from 'react';
import Link from 'next/link';
import './ButtonText.css';

export interface ButtonTextProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'variant1' | 'variant2' | 'variant3' | 'variant4' | 'variant5' | 'variant6';
  size?: 'sm' | 'md' | 'lg';
  minW?: number;
}


export const ButtonText = ({
  label,
  onClick,
  href,
  variant = 'variant1',
  size = 'md',
  minW
}: ButtonTextProps) => {
  const className = `button-text ${variant} size-${size}`;
  const remValue = (minW ?? 0) * 0.25;
  const style = minW
    ? {
        minWidth: `${remValue}rem`,
        maxWidth: `${remValue}rem`,
      }
    : undefined;

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {label}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} style={style}>
      {label}
    </button>
  );
};
