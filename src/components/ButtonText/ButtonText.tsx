'use client';

import React from 'react';
import Link from 'next/link';
import './ButtonText.css';

export interface ButtonTextProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'variant1' | 'variant2' | 'variant3' | 'variant4' | 'variant5' | 'variant6' | 'pill-outline' | 'pill-danger';
  size?: 'sm' | 'md' | 'lg';
  minW?: number;
  icon?: React.ReactNode;
}

export const ButtonText = ({
  label,
  onClick,
  href,
  variant = 'variant1',
  size = 'md',
  minW,
  icon,
}: ButtonTextProps) => {
  const className = `button-text ${variant} size-${size}`;
  const remValue = (minW ?? 0) * 0.25;
  const style = minW
    ? {
        minWidth: `${remValue}rem`,
        maxWidth: `${remValue}rem`,
      }
    : undefined;

  const content = (
    <span className="flex items-center justify-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      {label}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} style={style}>
      {content}
    </button>
  );
};
