'use client';

import React from 'react';
import { Language } from '../../types/chat';

interface LanguageSelectorBubbleProps {
  onLanguageSelect: (language: Language) => void;
  currentLanguage: Language;
  disabled?: boolean;
}

export const LanguageSelectorBubble: React.FC<LanguageSelectorBubbleProps> = ({
  onLanguageSelect,
  currentLanguage,
  disabled = false
}) => {
  // Fonction pour gérer la sélection de langue
  const handleLanguageSelect = (language: Language) => {
    if (!disabled) {
      // Stocker la langue sélectionnée dans localStorage
      window.localStorage.setItem('harmos_language', language);
      onLanguageSelect(language);
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '2px inset #ffffff',
      padding: '12px',
      fontFamily: 'MS Sans Serif, sans-serif'
    }}>
      <div style={{
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize: '11px',
        color: '#000000'
      }}>Choose your language / Choisissez votre langue:</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => handleLanguageSelect('fr')}
          disabled={disabled}
          style={{
            padding: '8px 16px',
            background: currentLanguage === 'fr' ? '#FF8EE8' : '#FFA1EC',
            color: currentLanguage === 'fr' ? '#ffffff' : '#000000',
            border: currentLanguage === 'fr' ? '2px inset #FF8EE8' : '2px outset #FFA1EC',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
        >
          🇫🇷 Français
        </button>
        <button
          onClick={() => handleLanguageSelect('en')}
          disabled={disabled}
          style={{
            padding: '8px 16px',
            background: currentLanguage === 'en' ? '#FF8EE8' : '#FFA1EC',
            color: currentLanguage === 'en' ? '#ffffff' : '#000000',
            border: currentLanguage === 'en' ? '2px inset #FF8EE8' : '2px outset #FFA1EC',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
};