'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox } from '../../types/chat';

interface CheckboxBubbleProps {
  checkboxes: Checkbox[];
  onSubmit: (selectedValues: string[], githubUrl: string) => void;
  disabled?: boolean;
}

export const CheckboxBubble: React.FC<CheckboxBubbleProps> = ({ checkboxes, onSubmit, disabled: _disabled = false }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // End animation state
    const endTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  const handleCheckboxChange = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (selectedValues.length > 0) {
      onSubmit(selectedValues, githubUrl);
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '2px outset #ffffff',
      padding: '8px',
      maxWidth: '400px',
      fontFamily: 'MS Sans Serif, sans-serif',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.95)',
      transition: 'all 0.5s ease-out'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Tech stack checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {checkboxes.map((checkbox, index) => (
            <label
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-4px)',
                transition: 'all 0.3s ease',
                transitionDelay: `${index * 100}ms`,
                fontFamily: 'MS Sans Serif, sans-serif'
              }}
            >
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(checkbox.value)}
                  onChange={() => handleCheckboxChange(checkbox.value)}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '13px',
                  height: '13px',
                  border: '2px inset #ffffff',
                  background: selectedValues.includes(checkbox.value) ? '#ffffff' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedValues.includes(checkbox.value) && (
                    <span style={{
                      color: '#000000',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      lineHeight: '1'
                    }}>✓</span>
                  )}
                </div>
              </div>
              <span style={{
                color: '#000000',
                fontSize: '11px',
                fontFamily: 'MS Sans Serif, sans-serif'
              }}>
                {checkbox.text}
              </span>
            </label>
          ))}
        </div>
        
        {/* GitHub URL input */}
        <div style={{ marginTop: '8px' }}>
          <label style={{
            display: 'block',
            color: '#000000',
            fontSize: '11px',
            fontFamily: 'MS Sans Serif, sans-serif',
            marginBottom: '4px'
          }}>
            GitHub Profile URL:
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username"
            style={{
              width: '100%',
              background: '#ffffff',
              border: '2px inset #ffffff',
              padding: '4px',
              color: '#000000',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '11px'
            }}
          />
        </div>
        
        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={selectedValues.length === 0}
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '6px 8px',
            background: selectedValues.length === 0 ? '#FFA1EC' : '#FFA1EC',
            border: selectedValues.length === 0 ? '2px inset #FFA1EC' : '2px outset #FFA1EC',
            color: '#000000',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            cursor: selectedValues.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {selectedValues.length === 0 ? 'Select at least one tech' : `Submit (${selectedValues.length} selected)`}
        </button>
      </div>
      
      {/* Selection counter */}
      <div style={{
        marginTop: '6px',
        textAlign: 'center',
        color: '#000000',
        fontSize: '10px',
        fontFamily: 'MS Sans Serif, sans-serif'
      }}>
        {selectedValues.length} / {checkboxes.length} technologies selected
      </div>
    </div>
  );
};