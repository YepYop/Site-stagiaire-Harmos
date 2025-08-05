'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../translations';
// Removed DatabaseService import - files are now sent directly via FormData

interface FreeBubbleProps {
  onSubmit: (content: string, files?: File[]) => void;
  disabled?: boolean;
  language?: Language;
}

export const FreeBubble: React.FC<FreeBubbleProps> = ({ onSubmit, disabled = false, language = 'fr' }) => {
  const [content, setContent] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<Array<{
    file: File;
    name: string;
    size: number;
    type: string;
  }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // End animation state
    const endTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  const handleSubmit = () => {
    if (content.trim() || files.length > 0) {
      onSubmit(content.trim(), files.map(f => f.file));
    }
  };


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsUploading(true);
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Instructions */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '4px',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            {getTranslation('freeContentTitle', language)}
          </h3>
          <p style={{
            fontSize: '11px',
            color: '#000000',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            {getTranslation('freeContentDescription', language)}
          </p>
        </div>

        {/* Text Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
          transition: 'all 0.3s ease-out',
          transitionDelay: '200ms'
        }}>
          <label style={{
            display: 'block',
            color: '#000000',
            fontSize: '11px',
            fontWeight: 'normal',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            {getTranslation('yourMessage', language)}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getTranslation('messagePlaceholder', language)}
            style={{
              width: '100%',
              height: '80px',
              background: '#ffffff',
              border: '2px inset #ffffff',
              padding: '4px',
              color: '#000000',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '11px',
              resize: 'none'
            }}
            disabled={disabled}
          />
        </div>

        {/* Drag & Drop Area */}
        <div
          style={{
            border: dragActive ? '2px dashed #FF8EE8' : '2px dashed #808080',
            background: dragActive ? '#FFE8F9' : '#FFE8F9',
            padding: '12px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            transitionDelay: '400ms',
            opacity: disabled ? 0.5 : (isVisible ? 1 : 0),
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(2px) scale(0.95)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="space-y-2">
            <div className="text-gray-600 text-sm">
              <p className="font-medium">{getTranslation('dragDropFiles', language)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {getTranslation('dragDropDescription', language)}
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
            transition: 'all 0.3s ease-out',
            transitionDelay: '600ms'
          }}>
            <label style={{
              display: 'block',
              color: '#000000',
              fontSize: '11px',
              fontWeight: 'normal',
              fontFamily: 'MS Sans Serif, sans-serif'
            }}>
              {getTranslation('selectedFiles', language)}
            </label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              maxHeight: '80px',
              overflowY: 'auto'
            }}>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px',
                    border: '2px inset #ffffff',
                    background: '#FFE8F9',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(4px)',
                    transition: 'all 0.3s ease-out',
                    transitionDelay: `${700 + index * 100}ms`,
                    fontFamily: 'MS Sans Serif, sans-serif'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 'normal',
                        fontSize: '10px',
                        color: '#000000'
                      }}>
                        {file.name}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#000000'
                      }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || getTranslation('unknownType', language)}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#000000'
                      }}>{getTranslation('readyToSend', language)}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    style={{
                      color: '#800000',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '2px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'MS Sans Serif, sans-serif'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || (!content.trim() && files.length === 0) || isUploading}
          style={{
            width: '100%',
            padding: '6px 12px',
            background: disabled || (!content.trim() && files.length === 0) || isUploading ? '#FFA1EC' : '#FFA1EC',
            border: disabled || (!content.trim() && files.length === 0) || isUploading ? '2px inset #FFA1EC' : '2px outset #FFA1EC',
            color: '#000000',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
            fontWeight: 'normal',
            cursor: disabled || (!content.trim() && files.length === 0) || isUploading ? 'not-allowed' : 'pointer',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(2px) scale(0.95)',
            transition: 'all 0.3s ease-out',
            transitionDelay: '800ms'
          }}
        >
          {isUploading
            ? getTranslation('uploadInProgress', language)
            : (!content.trim() && files.length === 0)
            ? getTranslation('addContentToSend', language)
            : getTranslation('sendProfile', language)
          }
        </button>

        {/* Help Text */}
        <div className={`
          text-center text-xs text-gray-500 transition-all duration-300 ease-out
          ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2'
          }
        `}
        style={{ transitionDelay: '900ms' }}
        >
        </div>
      </div>
    </div>
  );
};