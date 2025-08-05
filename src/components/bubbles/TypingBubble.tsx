'use client';

import React, { useState, useEffect } from 'react';

interface TypingBubbleProps {
  content: string;
}

export const TypingBubble: React.FC<TypingBubbleProps> = ({ content }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Detect if this is a job opportunity message (co-founder or internship)
  const isJobOpportunityMessage = 
    content.includes('OPPORTUNITÉ CO-FONDATEUR') || 
    content.includes('CO-FOUNDER OPPORTUNITY') ||
    content.includes('OPPORTUNITÉ STAGE') ||
    content.includes('INTERNSHIP OPPORTUNITY');

  // Créer un événement personnalisé pour signaler que l'animation de frappe est terminée
  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, isJobOpportunityMessage ? 30 : 50); // Faster typing for hacker effect

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      // Déclencher un événement personnalisé lorsque l'animation de frappe est terminée
      const event = new CustomEvent('typingComplete', { detail: { content } });
      window.dispatchEvent(event);
    }
  }, [currentIndex, content, isJobOpportunityMessage]);

  const lines = displayedText.split('\n');

  if (isJobOpportunityMessage) {
    return (
      <div className="relative bg-black border-2 border-pink-500 rounded-lg p-6 max-w-5xl shadow-2xl overflow-hidden animate-pulse-glow">
        {/* Retro hacker terminal header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-pink-500">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          <div className="text-pink-400 text-sm font-mono animate-pulse">HARMOS_TERMINAL_v2.1</div>
        </div>
        
        {/* Enhanced scanline effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-scan"></div>
        </div>
        
        {/* Terminal content */}
        <div className="font-mono text-base text-pink-400 leading-relaxed relative z-10">
          <div className="text-pink-300 mb-2">
            {content.includes('CO-FOUNDER') || content.includes('CO-FONDATEUR') ? 
              '$ ./harmos_recruitment.sh --position=co-founder' : 
              content.includes('TECH') ? '$ ./harmos_recruitment.sh --position=tech' :
              content.includes('DESIGN') ? '$ ./harmos_recruitment.sh --position=design' :
              content.includes('COMMUNICATION') ? '$ ./harmos_recruitment.sh --position=communication' :
              content.includes('BUSINESS') ? '$ ./harmos_recruitment.sh --position=business' :
              '$ ./harmos_recruitment.sh --position=internship'
            }
          </div>
          <div className="text-pink-500 mb-3">Initializing recruitment protocol...</div>
          
          {lines.map((line, index) => {
            const _processedLine = line;
            
            // Style the title with special effects
             if (line.includes('OPPORTUNITÉ CO-FONDATEUR') || 
                 line.includes('CO-FOUNDER OPPORTUNITY') ||
                 line.includes('OPPORTUNITÉ STAGE') ||
                 line.includes('INTERNSHIP OPPORTUNITY')) {
               return (
                 <div key={index} className="text-pink-300 font-bold text-lg mb-2 animate-pulse">
                   <span className="text-red-400">{'>'}</span> {line}
                 </div>
               );
             }
             
             // Style bullet points
             if (line.startsWith('•')) {
               return (
                 <div key={index} className="text-pink-400 ml-4 mb-1">
                   <span className="text-pink-300">{'>'}</span> {line.substring(1)}
                 </div>
               );
             }
            
            // Style section headers
            if (line.startsWith('[INFO]')) {
              // Extract the [INFO] part and the rest of the line
              const infoTag = line.substring(0, 6); // '[INFO]'
              const restOfLine = line.substring(6); // Rest of the line after '[INFO]'
              return (
                <div key={index} className="text-pink-300 font-semibold mt-3 mb-2">
                  <span className="text-yellow-400">{infoTag}</span>{restOfLine}
                </div>
              );
            }
            
            return (
              <div key={index} className={`text-pink-400 ${index > 0 ? 'mt-1' : ''}`}>
                {line}
              </div>
            );
          })}
          
          {/* Enhanced blinking cursor with hacker style */}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-pink-400 ml-1 animate-ping shadow-lg shadow-pink-400/50"></span>
          )}
          
          {isComplete && (
            <div className="mt-3 text-pink-300 text-xs">
              <span className="animate-pulse">$ _</span>
              <div className="mt-2 text-pink-500 text-xs animate-bounce">
                [SYSTEM] Message transmission complete
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced glitch effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-full h-px bg-pink-500 animate-pulse shadow-sm shadow-pink-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-pink-500 animate-pulse shadow-sm shadow-pink-500"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-pink-400/30 animate-glitch"></div>
        </div>
      </div>
    );
  }

  // Default styling for other messages with enhanced animations
  return (
    <div style={{
      background: '#ffffff',
      border: '2px inset #ffffff',
      padding: '8px 12px',
      maxWidth: '600px',
      fontFamily: 'MS Sans Serif, sans-serif',
      transition: 'all 0.5s ease-out'
    }}>
      <div style={{
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        color: '#000000',
        lineHeight: '1.4'
      }}>
        {lines.map((line, index) => (
          <div 
            key={index} 
            style={{
              marginTop: index > 0 ? '2px' : '0',
              opacity: displayedText.length > 0 ? 1 : 0,
              transform: displayedText.length > 0 ? 'translateY(0)' : 'translateY(2px)',
              transition: 'all 0.3s ease-out',
              transitionDelay: `${index * 50}ms`
            }}
          >
            {line}
          </div>
        ))}
        
        {/* Enhanced blinking cursor */}
        {!isComplete && (
          <span style={{
            display: 'inline-block',
            width: '1px',
            height: '12px',
            background: '#000000',
            marginLeft: '2px',
            animation: 'blink 1s infinite'
          }}></span>
        )}
      </div>
    </div>
  );
};