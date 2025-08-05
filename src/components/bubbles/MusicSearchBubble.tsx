'use client';

import React, { useState, useEffect } from 'react';
import { MusicSuggestion } from '../../types/chat';

interface MusicSearchBubbleProps {
  suggestions: MusicSuggestion[];
  onMusicSelect: (songs: (MusicSuggestion | string)[]) => void;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
}

export const MusicSearchBubble: React.FC<MusicSearchBubbleProps> = ({ 
  suggestions, 
  onMusicSelect, 
  disabled = false,
  multiSelect = true,
  maxSelections = 3
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customSong, setCustomSong] = useState('');
  const [_showCustomInput, setShowCustomInput] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<(MusicSuggestion | string)[]>([]);
  const [searchResults, setSearchResults] = useState<MusicSuggestion[]>([]);
 
  // Debug logging for search results
  useEffect(() => {
    console.log('🎯 [MOBILE DEBUG] Search results updated, count:', searchResults.length);
    console.log('🎯 [MOBILE DEBUG] Search results data:', searchResults);
  }, [searchResults]);
  const [_isSearching, setIsSearching] = useState(false);
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
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  const _filteredSuggestions = suggestions.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // iTunes Search API call
  const searchMusic = async (query: string): Promise<MusicSuggestion[]> => {
    console.log('🎵 [MOBILE DEBUG] searchMusic called with query:', query);
    console.log('🎵 [MOBILE DEBUG] User agent:', navigator.userAgent);
    
    if (!query.trim()) {
      console.log('🎵 [MOBILE DEBUG] Empty query, returning empty array');
      return [];
    }
    
    setIsSearching(true);
    console.log('🎵 [MOBILE DEBUG] Starting search, isSearching set to true');
    
    try {
      // Utiliser notre API proxy au lieu d'appeler directement l'API iTunes
      const url = `/api/proxy-itunes?term=${encodeURIComponent(query)}`;
      console.log('🎵 [MOBILE DEBUG] Fetching URL:', url);
      
      const response = await fetch(url);
      console.log('🎵 [MOBILE DEBUG] Response status:', response.status);
      console.log('🎵 [MOBILE DEBUG] Response ok:', response.ok);
      
      const data = await response.json();
      console.log('🎵 [MOBILE DEBUG] API response data:', data);
      console.log('🎵 [MOBILE DEBUG] Number of results:', data.results?.length || 0);
      
      const results = data.results.map((track: { trackName: string; artistName: string; primaryGenreName?: string }) => ({
        title: track.trackName,
        artist: track.artistName,
        genre: track.primaryGenreName || 'Unknown'
      }));
      
      console.log('🎵 [MOBILE DEBUG] Mapped results:', results);
      
      setIsSearching(false);
      return results;
    } catch (error) {
      console.error('🎵 [MOBILE DEBUG] Error searching music:', error);
      console.error('🎵 [MOBILE DEBUG] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
      setIsSearching(false);
      return [];
    }
  };

  const handleSearch = async (query: string) => {
    console.log('🔍 [MOBILE DEBUG] handleSearch called with query:', query);
    console.log('🔍 [MOBILE DEBUG] Query length:', query.length);
    
    setSearchTerm(query);
    
    if (query.length > 2) {
      console.log('🔍 [MOBILE DEBUG] Query length > 2, calling searchMusic');
      const results = await searchMusic(query);
      console.log('🔍 [MOBILE DEBUG] Search results received:', results);
      setSearchResults(results);
      console.log('🔍 [MOBILE DEBUG] Search results set in state');
    } else {
      console.log('🔍 [MOBILE DEBUG] Query too short, clearing results');
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (song: MusicSuggestion) => {
    console.log('🎵 [MOBILE DEBUG] handleSuggestionClick called with song:', song);
    console.log('🎵 [MOBILE DEBUG] disabled state:', disabled);
    console.log('🎵 [MOBILE DEBUG] multiSelect:', multiSelect);
    console.log('🎵 [MOBILE DEBUG] selectedSongs before:', selectedSongs);
    
    if (disabled) {
      console.log('🎵 [MOBILE DEBUG] Click ignored - component is disabled');
      return;
    }
    
    if (multiSelect) {
      if (selectedSongs.length < maxSelections && !selectedSongs.some(s => 
        typeof s === 'object' && s.title === song.title && s.artist === song.artist
      )) {
        setSelectedSongs([...selectedSongs, song]);
      }
    } else {
      onMusicSelect([song]);
    }
  };

  const _handleCustomSubmit = () => {
    if (disabled || !customSong.trim()) return;
    
    if (multiSelect) {
      if (selectedSongs.length < maxSelections && !selectedSongs.includes(customSong.trim())) {
        setSelectedSongs([...selectedSongs, customSong.trim()]);
      }
    } else {
      onMusicSelect([customSong.trim()]);
    }
    
    setCustomSong('');
    setShowCustomInput(false);
  };

  const handleRemoveSelection = (index: number) => {
    setSelectedSongs(selectedSongs.filter((_, i) => i !== index));
  };

  const handleSubmitSelections = () => {
    if (selectedSongs.length > 0) {
      onMusicSelect(selectedSongs);
    }
  };

  const _getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      'Rock': 'bg-red-100 text-red-700',
      'Hip-Hop': 'bg-purple-100 text-purple-700',
      'Electronic': 'bg-pink-100 text-pink-700',
      'Classical': 'bg-yellow-100 text-yellow-700',
      'Pop': 'bg-pink-100 text-pink-700',
      'Ambient': 'bg-pink-100 text-pink-700'
    };
    return colors[genre] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '2px inset #ffffff',
      padding: '12px',
      maxWidth: '600px',
      fontFamily: 'MS Sans Serif, sans-serif',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.95)',
      transition: 'all 0.5s ease-out'
    }}>
      {/* Search Bar */}
      <div style={{
        marginBottom: '12px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
        transition: 'all 0.3s ease-out',
        transitionDelay: '200ms'
      }}>
        <input
          type="text"
          value={searchTerm}
          onInput={(e) => {
            console.log('📱 [MOBILE DEBUG] onInput event triggered with value:', e.currentTarget.value);
            handleSearch(e.currentTarget.value);
          }}
          onChange={(e) => {
            console.log('📱 [MOBILE DEBUG] onChange event triggered with value:', e.target.value);
            handleSearch(e.target.value);
          }}
          onKeyUp={(e) => {
            console.log('📱 [MOBILE DEBUG] onKeyUp event triggered with value:', e.currentTarget.value);
          }}
          onTouchEnd={(e) => {
            console.log('📱 [MOBILE DEBUG] onTouchEnd event triggered');
          }}
          placeholder="Search for a song..."
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '2px inset #ffffff',
            background: '#ffffff',
            color: '#000000',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px'
          }}
          disabled={disabled}
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{
          marginBottom: '8px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
          transition: 'all 0.3s ease-out',
          transitionDelay: '300ms'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            maxHeight: '120px',
            overflowY: 'auto'
          }}>
            {searchResults.map((song, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log('🖱️ [MOBILE DEBUG] Button onClick triggered for song:', song.title);
                  handleSuggestionClick(song);
                }}
                onTouchStart={() => {
                  console.log('👆 [MOBILE DEBUG] Button onTouchStart triggered for song:', song.title);
                }}
                onTouchEnd={(e) => {
                  console.log('👆 [MOBILE DEBUG] Button onTouchEnd triggered for song:', song.title);
                  e.preventDefault();
                  handleSuggestionClick(song);
                }}
                disabled={disabled || (selectedSongs.length >= 3 && !selectedSongs.some(s => 
                  typeof s === 'object' && s.title === song.title && s.artist === song.artist
                ))}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '4px 6px',
                  background: selectedSongs.some(s => typeof s === 'object' && s.title === song.title && s.artist === song.artist)
                    ? '#FFE8F9'
                    : disabled || selectedSongs.length >= 3
                    ? '#ffffff'
                    : '#ffffff',
                  border: selectedSongs.some(s => typeof s === 'object' && s.title === song.title && s.artist === song.artist)
                    ? '2px inset #ffffff'
                    : disabled || selectedSongs.length >= 3
                    ? '2px inset #ffffff'
                    : '2px outset #ffffff',
                  color: disabled || selectedSongs.length >= 3 ? '#808080' : '#000000',
                  fontFamily: 'MS Sans Serif, sans-serif',
                  fontSize: '10px',
                  cursor: disabled || selectedSongs.length >= 3 ? 'not-allowed' : 'pointer',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-4px)',
                  transition: 'all 0.3s ease-out',
                  transitionDelay: `${400 + index * 50}ms`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      fontWeight: 'normal',
                      fontSize: '10px',
                      fontFamily: 'MS Sans Serif, sans-serif',
                      color: '#000000'
                    }}>
                      🎵 {song.title}
                    </div>
                    <div style={{
                      fontSize: '9px',
                      color: '#000000',
                      fontFamily: 'MS Sans Serif, sans-serif'
                    }}>by {song.artist}</div>
                  </div>
                  <span style={{
                    padding: '2px 4px',
                    background: '#FFE8F9',
                    border: '1px solid #808080',
                    fontSize: '9px',
                    fontFamily: 'MS Sans Serif, sans-serif',
                    color: '#000000'
                  }}>
                    {song.genre}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected songs display */}
      <div style={{
        marginBottom: '8px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
        transition: 'all 0.3s ease-out',
        transitionDelay: '600ms'
      }}>
        <h4 style={{
          fontSize: '11px',
          fontWeight: 'normal',
          color: '#000000',
          marginBottom: '4px',
          fontFamily: 'MS Sans Serif, sans-serif'
        }}>
          Selected songs ({selectedSongs.length}/3):
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {selectedSongs.map((song, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 6px',
                border: '2px inset #ffffff',
                background: '#FFE8F9',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(4px)',
                transition: 'all 0.3s ease-out',
                transitionDelay: `${700 + index * 100}ms`,
                fontFamily: 'MS Sans Serif, sans-serif'
              }}
            >
              <div>
                <div style={{
                  fontWeight: 'normal',
                  fontSize: '10px',
                  color: '#000000',
                  fontFamily: 'MS Sans Serif, sans-serif'
                }}>
                  🎵 {typeof song === 'string' ? song : song.title}
                </div>
                {typeof song === 'object' && (
                  <div style={{
                    fontSize: '9px',
                    color: '#000000',
                    fontFamily: 'MS Sans Serif, sans-serif'
                  }}>
                    by {song.artist}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRemoveSelection(index)}
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
          
          {/* Empty slots */}
          {[...Array(3 - selectedSongs.length)].map((_, index) => (
            <div 
              key={`empty-${index}`}
              className={`
                p-2 sm:p-3 border-2 border-dashed border-white bg-white rounded-lg text-center text-gray-400 text-xs sm:text-sm
                transition-all duration-300 ease-out
                ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4'
                }
              `}
              style={{ transitionDelay: `${700 + (selectedSongs.length + index) * 100}ms` }}
            >
              Slot {selectedSongs.length + index + 1} - Select a song
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitSelections}
        disabled={disabled || selectedSongs.length !== 3}
        style={{
          width: '100%',
          padding: '6px 12px',
          background: disabled || selectedSongs.length !== 3 ? '#FFA1EC' : '#FFA1EC',
          border: disabled || selectedSongs.length !== 3 ? '2px inset #FFA1EC' : '2px outset #FFA1EC',
          color: disabled || selectedSongs.length !== 3 ? '#808080' : '#000000',
          fontFamily: 'MS Sans Serif, sans-serif',
          fontSize: '11px',
          fontWeight: 'normal',
          cursor: disabled || selectedSongs.length !== 3 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {selectedSongs.length === 3 
          ? '🎵 Send my 3 songs' 
          : `Select ${3 - selectedSongs.length} more song(s)`
        }
      </button>
    </div>
  );
};