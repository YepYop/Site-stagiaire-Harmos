'use client';

import React from 'react';
import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';

interface React95ProviderProps {
  children: React.ReactNode;
}

export const React95Provider: React.FC<React95ProviderProps> = ({ children }) => {
  return (
    <div style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
      {children}
    </div>
  );
};