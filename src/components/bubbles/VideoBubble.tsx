'use client';

import React, { useState, useEffect } from 'react';
import { getTranslation } from '../../translations';
import { Language } from '../../types/chat';

interface VideoBubbleProps {
  videoSrc: string;
  language?: Language;
}

export const VideoBubble: React.FC<VideoBubbleProps> = ({ videoSrc, language = 'fr' }) => {
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

  return (
    <div style={{
      background: '#ffffff',
      border: '2px outset #ffffff',
      padding: '8px',
      maxWidth: '600px',
      fontFamily: 'MS Sans Serif, sans-serif',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.95)',
      transition: 'all 0.5s ease-out'
    }}>
      <div className={`
        relative transition-all duration-300 ease-out
        ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }
      `}
      style={{ transitionDelay: '200ms' }}
      >
        <video
          controls
          className="w-full rounded-xl hover-lift"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23374151' font-family='sans-serif'%3EHarmos Intro Video%3C/text%3E%3C/svg%3E"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div style={{
        fontSize: '12px',
        fontWeight: 'normal',
        color: '#000000',
        marginBottom: '8px',
        textAlign: 'center',
        fontFamily: 'MS Sans Serif, sans-serif',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
        transition: 'all 0.3s ease-out',
        transitionDelay: '400ms'
      }}>
        🎬 Intro Video
      </div>
      
      <div style={{
        marginTop: '8px',
        padding: '8px',
        background: '#FFE8F9',
        border: '2px inset #ffffff',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
        transition: 'all 0.3s ease-out',
        transitionDelay: '600ms'
      }}>
        <p style={{
          color: '#000000',
          fontSize: '11px',
          fontFamily: 'MS Sans Serif, sans-serif',
          textAlign: 'center',
          margin: 0
        }}>
          {getTranslation('videoWatchPrompt', language)}
        </p>
      </div>
    </div>
  );
};