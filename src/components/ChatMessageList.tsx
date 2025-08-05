'use client';

import React from 'react';
import { Message, ChatMessageListProps } from '../types/chat';
import { TextBubble } from './bubbles/TextBubble';
import { VideoBubble } from './bubbles/VideoBubble';
import { TypingBubble } from './bubbles/TypingBubble';
import { ButtonsBubble } from './bubbles/ButtonsBubble';
import { CheckboxBubble } from './bubbles/CheckboxBubble';
import { MusicSearchBubble } from './bubbles/MusicSearchBubble';
import { FreeBubble } from './bubbles/FreeBubble';
import { LanguageSelectorBubble } from './bubbles/LanguageSelectorBubble';

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  onButtonClick,
  onCheckboxSubmit,
  onMusicSelect,
  onFreeContentSubmit,
  onLanguageSelect,
  currentLanguage
}) => {
  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    const bubbleContent = () => {
      switch (message.type) {
        case 'text':
          return <TextBubble content={message.content} isUser={isUser} />;
        case 'video':
          return <VideoBubble videoSrc={message.content} language={currentLanguage} />;
        case 'typing':
          return <TypingBubble content={message.content} />;
        case 'buttons':
          return (
            <ButtonsBubble 
              buttons={message.buttons || []} 
              onButtonClick={(value, text) => onButtonClick(value, text)}
              disabled={message.disabled}
            />
          );
        case 'checkboxes':
          return (
            <CheckboxBubble 
              checkboxes={message.checkboxes || []} 
              onSubmit={onCheckboxSubmit} 
            />
          );
        case 'music_search':
          return (
            <MusicSearchBubble 
              suggestions={message.musicSuggestions || []} 
              onMusicSelect={onMusicSelect}
              disabled={message.disabled}
              multiSelect={message.multiSelect}
              maxSelections={message.maxSelections}
            />
          );
        case 'free_content':
          return (
            <FreeBubble 
              onSubmit={onFreeContentSubmit || (() => {})}
              disabled={message.disabled}
              language={currentLanguage}
            />
          );
        case 'language_selector':
          return (
            <LanguageSelectorBubble
              onLanguageSelect={onLanguageSelect || (() => {})}
              currentLanguage={currentLanguage || 'fr'}
              disabled={message.disabled}
            />
          );
        default:
          return <TextBubble content={message.content} isUser={isUser} />;
      }
    };

    return (
      <div
        key={message.id}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          marginBottom: '12px',
          justifyContent: isUser ? 'flex-end' : 'flex-start'
        }}
      >
        {!isUser && (
          <div style={{
            width: '24px',
            height: '24px',
            background: '#F5F5DC',
            border: '2px inset #F5F5DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            🤖
          </div>
        )}
        <div style={{
          maxWidth: '400px',
          background: 'rgba(245, 245, 220, 0.9)',
          border: isUser ? '2px outset #F5F5DC' : '2px inset #F5F5DC',
          padding: '4px'
        }}>
          {bubbleContent()}
          <div style={{
            fontSize: '10px',
            color: '#FF8EE8',
            marginTop: '4px',
            textAlign: isUser ? 'right' : 'left',
            fontFamily: 'MS Sans Serif, sans-serif'
          }}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {isUser && (
          <div style={{
            width: '24px',
            height: '24px',
            background: '#F5F5DC',
            border: '2px inset #F5F5DC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>
            👤
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '8px', background: 'transparent' }}>
      {messages.map(renderMessage)}
    </div>
  );
};