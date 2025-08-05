'use client';

import React, { useState, useEffect } from 'react';

interface TextBubbleProps {
  content: string;
  isUser: boolean;
}

export const TextBubble: React.FC<TextBubbleProps> = ({ content, isUser }) => {
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
    }, 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  const formatContent = (text: string) => {
    // Handle markdown-style bold text
    const parts = text.split(/\*\*(.*?)\*\*/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ fontWeight: 'bold' }}>{part}</strong>;
      }
      return part;
    });
  };

  const lines = content.split('\n');

  return (
    <div
      style={{
        background: isUser ? '#FFA1EC' : '#ffffff',
        color: isUser ? '#ffffff' : '#000000',
        border: isUser ? '2px outset #FFA1EC' : '2px inset #ffffff',
        padding: '8px',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        lineHeight: '1.4',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.3s ease-out'
      }}
    >
      {lines.map((line, index) => (
        <div 
          key={index} 
          style={{
            marginTop: index > 0 ? '4px' : '0',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${isUser ? '10px' : '-10px'})`,
            transition: 'all 0.3s ease-out',
            transitionDelay: `${index * 100}ms`
          }}
        >
          {formatContent(line)}
        </div>
      ))}
    </div>
  );
};