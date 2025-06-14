import React from 'react';

interface TurkishFlagProps {
  className?: string;
}

export default function TurkishFlag({ className }: TurkishFlagProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="30" height="30" fill="#E30A17"/>
      <circle cx="13" cy="15" r="7" fill="#ffffff"/>
      <circle cx="14.5" cy="15" r="6" fill="#E30A17"/>
      <path d="M17.5 15L20 13.5L20 16.5L17.5 15Z" fill="#ffffff"/>
    </svg>
  );
} 