'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../types/chat';

interface ButtonsBubbleProps {
  buttons: Button[];
  onButtonClick: (value: string, text: string) => void;
  disabled?: boolean;
}

export const ButtonsBubble: React.FC<ButtonsBubbleProps> = ({ buttons, onButtonClick, disabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = (value: string, text: string, index: number) => {
    if (!disabled) {
      setClickedButton(index);
      setTimeout(() => {
        onButtonClick(value, text);
      }, 150);
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '2px inset #ffffff',
      padding: '8px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button.value, button.text, index)}
            disabled={disabled}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '6px 8px',
              background: disabled ? '#808080' : '#FFA1EC',
              color: disabled ? '#ffffff' : '#000000',
              border: clickedButton === index ? '2px inset #FFA1EC' : '2px outset #FFA1EC',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '11px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
              transition: 'all 0.3s ease-out',
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontWeight: clickedButton === index ? 'bold' : 'normal'
              }}>
                {button.text}
              </span>
              <span style={{
                fontSize: '10px',
                color: clickedButton === index ? '#FF8EE8' : 'transparent'
              }}>
                {clickedButton === index ? '✓' : ''}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};