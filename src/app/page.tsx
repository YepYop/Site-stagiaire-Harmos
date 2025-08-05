'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessageList } from '../components/ChatMessageList';
import { Message, FlowStep, MusicSuggestion, Language } from '../types/chat';
import { getTranslation } from '../translations';
import { React95Provider } from '../components/React95Provider';
import { Button, Input, Frame, Modal } from '@react95/core';


interface UserAnswers {
  name?: string;
  email?: string;
  age?: string;
  school?: string;
  studyYear?: string;
  internshipDuration?: string;
  positionType?: string;
  motivation?: string;
  song1?: string;
  song2?: string;
  song3?: string;
  files?: string;
  portfolio?: string; // Contenu du portfolio du candidat
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<FlowStep>('welcome');
  const [userInput, setUserInput] = useState('');
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isBotWriting, setIsBotWriting] = useState(false);
  // Initialiser avec 'fr' par défaut pour éviter les problèmes d'hydratation
  const [language, setLanguage] = useState<Language>('fr');
  
  // Effet pour charger la langue depuis localStorage après le montage du composant
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = window.localStorage.getItem('harmos_language');
      if (savedLanguage === 'en' || savedLanguage === 'fr') {
        setLanguage(savedLanguage as Language);
      }
    }
  }, []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Désactiver le sélecteur de langue après la sélection
    setMessages(prev => prev.map(msg => 
      msg.type === 'language_selector' ? { ...msg, disabled: true } : msg
    ));
    
    // Ajouter le message de bienvenue après la sélection de la langue
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: getTranslation('welcome', newLanguage) + '\n\n' + getTranslation('startPrompt', newLanguage),
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  useEffect(() => {
    // Initial language selector only
    const languageSelector: Message = {
      id: '1',
      type: 'language_selector',
      content: '',
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages([languageSelector]);
  }, []); // Ne dépend plus de language pour éviter de réinitialiser les messages à chaque changement de langue

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserMessage = async (content: string) => {
    // Add user message
    addMessage({
      type: 'text',
      content,
      sender: 'user'
    });

    setUserInput('');
    setIsTyping(true);
    setIsBotWriting(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);

    // Handle different flow steps
    switch (currentStep) {
        
      case 'welcome':
        if ((language === 'fr' && content.toLowerCase().includes('commencer')) || 
            (language === 'en' && content.toLowerCase().includes('start'))) {
          handleCommencerFlow();
        }
        setIsBotWriting(false);
        break;
      
      case 'video_shown':
        if ((language === 'fr' && (content.toLowerCase().includes('vu') || content.toLowerCase().includes('regardé') || content.toLowerCase().includes('fini'))) || 
            (language === 'en' && (content.toLowerCase().includes('seen') || content.toLowerCase().includes('watched') || content.toLowerCase().includes('finished') || content.toLowerCase().includes('done')))) {
          handleJobDescriptionFlow();
        } else {
          addMessage({
            type: 'text',
            content: getTranslation('videoWatchPrompt', language),
            sender: 'ai'
          });
        }
        setIsBotWriting(false);
        break;
      
      case 'step_a_name':
        if (content.trim().length < 2) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidNamePrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, name: content.trim() }));
          addMessage({
            type: 'text',
            content: getTranslation('emailPrompt', language, { name: content.trim() }),
            sender: 'ai'
          });
          setCurrentStep('step_a_email');
        }
        setIsBotWriting(false);
        break;
        
      case 'step_a_email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(content.trim())) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidEmailPrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, email: content.trim() }));
          handleAgeQuestion();
        }
        setIsBotWriting(false);
        break;

      case 'step_a_age':
        const ageValue = parseInt(content.trim());
        if (isNaN(ageValue) || ageValue < 16 || ageValue > 100) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidAgePrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, age: content.trim() }));
          handleSchoolQuestion();
        }
        setIsBotWriting(false);
        break;

      case 'step_a_school':
        if (content.trim().length < 2) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidSchoolPrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, school: content.trim() }));
          handleStudyYearQuestion();
        }
        setIsBotWriting(false);
        break;

      case 'step_a_study_year':
        if (content.trim().length < 2) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidStudyYearPrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, studyYear: content.trim() }));
          handleInternshipDurationQuestion();
        }
        setIsBotWriting(false);
        break;

      case 'step_a_internship_duration':
        if (content.trim().length < 2) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidInternshipDurationPrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, internshipDuration: content.trim() }));
          handlePositionTypeQuestion();
        }
        setIsBotWriting(false);
        break;

      case 'step_a_motivation':
        if (content.trim().length < 2) {
          addMessage({
            type: 'text',
            content: getTranslation('invalidMotivationPrompt', language),
            sender: 'ai'
          });
        } else {
          setUserAnswers(prev => ({ ...prev, motivation: content.trim() }));
          handleMusicQuestion();
        }
        setIsBotWriting(false);
        break;
    }
  };

  const handleCommencerFlow = async () => {
    // Video introduction
    addMessage({
      type: 'text',
      content: getTranslation('videoIntro', language),
      sender: 'ai'
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    
    addMessage({
      type: 'video',
      content: '/sample-video.mp4',
      sender: 'ai'
    });
    
    setCurrentStep('video_shown');
  };

  const handleJobDescriptionFlow = async () => {
    addMessage({
      type: 'text',
      content: getTranslation('positionTypePrompt', language),
      sender: 'ai'
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'buttons',
      content: '',
      sender: 'ai',
      buttons: [
        { text: getTranslation('techOption', language) + ' 👨‍💻', value: 'tech' },
        { text: getTranslation('designOption', language) + ' 🎨', value: 'design' },
        { text: getTranslation('communicationOption', language) + ' 📢', value: 'communication' },
        { text: getTranslation('businessOption', language) + ' 💼', value: 'business' },
        { text: getTranslation('otherOption', language) + ' 🌟', value: 'other' }
      ]
    });
    
    setCurrentStep('step_a_position_type');
  };

  const handleButtonClick = async (value: string, text: string) => {
    // Disable all buttons in the specific message that was clicked
    setMessages(prev => prev.map((msg, index) => {
      // Find the last message with buttons (the one that was just clicked)
      const lastButtonMessageIndex = prev.map((m, i) => ({ msg: m, index: i }))
        .filter(item => item.msg.type === 'buttons' && !item.msg.disabled)
        .pop()?.index;
      
      if (index === lastButtonMessageIndex && msg.type === 'buttons') {
        return { ...msg, disabled: true };
      }
      return msg;
    }));
    
    setIsBotWriting(true);
    
    switch (value) {
      case 'interested':
        addMessage({
          type: 'text',
          content: text,
          sender: 'user'
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        addMessage({
          type: 'text',
          content: getTranslation('namePrompt', language),
          sender: 'ai'
        });
        
        setCurrentStep('step_a_name');
        setIsBotWriting(false);
        break;
        
      // Position type options
      case 'design':
      case 'communication':
      case 'tech':
      case 'business':
      case 'other':
        addMessage({
          type: 'text',
          content: text,
          sender: 'user'
        });
        
        setUserAnswers(prev => ({ ...prev, positionType: value }));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Afficher la fiche de poste adaptée en fonction du type choisi
        let jobDescription = '';
        
        if (value === 'tech') {
          jobDescription = language === 'fr' ?
            '> OPPORTUNITÉ STAGE TECH\nCHEZ HARMOS\nNous construisons l\'avenir de la création musicale.\n\n[INFO] Ce dont nous avons besoin :\n> Développement de fonctionnalités\n> Participation à l\'évolution de la plateforme\n> Passion pour la tech et le gaming\n\n[INFO] Profil recherché :\n> Étudiant en informatique\n> Créatif et autonome\n> Mentalité startup' :
            '> TECH INTERNSHIP OPPORTUNITY\nAT HARMOS\nWe are building the future of music creation.\n\n[INFO] What we need:\n> Feature development\n> Participation in platform evolution\n> Passion for tech and gaming\n\n[INFO] Profile sought:\n> Computer science student\n> Creative and autonomous\n> Startup mindset';
        } else if (value === 'design') {
          jobDescription = language === 'fr' ?
            '> OPPORTUNITÉ STAGE DESIGN\nCHEZ HARMOS\nNous construisons l\'avenir de la création musicale.\n\n[INFO] Ce dont nous avons besoin :\n> Conception d\'interfaces\n> Création de visuels et d\'expériences immersives\n> Sensibilité à l\'univers ARMOS\n\n[INFO] Profil recherché :\n> Étudiant en design graphique / UI/UX\n> Créatif et autonome\n> Mentalité startup' :
            '> DESIGN INTERNSHIP OPPORTUNITY\nAT HARMOS\nWe are building the future of music creation.\n\n[INFO] What we need:\n> Interface design\n> Creation of visuals and immersive experiences\n> Sensitivity to the ARMOS universe\n\n[INFO] Profile sought:\n> Graphic design / UI/UX student\n> Creative and autonomous\n> Startup mindset';
        } else if (value === 'communication') {
          jobDescription = language === 'fr' ?
            '> OPPORTUNITÉ STAGE COMMUNICATION\nCHEZ HARMOS\nNous construisons l\'avenir de la création musicale.\n\n[INFO] Ce dont nous avons besoin :\n> Création de contenu\n> Animation réseaux sociaux\n> Campagnes de communication\n\n[INFO] Profil recherché :\n> Étudiant en marketing ou communication\n> Curieux des nouvelles tendances\n> Mentalité startup' :
            '> COMMUNICATION INTERNSHIP OPPORTUNITY\nAT HARMOS\nWe are building the future of music creation.\n\n[INFO] What we need:\n> Content creation\n> Social media management\n> Communication campaigns\n\n[INFO] Profile sought:\n> Marketing or communication student\n> Curious about new trends\n> Startup mindset';
        } else if (value === 'business') {
          jobDescription = language === 'fr' ?
            '> OPPORTUNITÉ STAGE BUSINESS\nCHEZ HARMOS\nNous construisons l\'avenir de la création musicale.\n\n[INFO] Ce dont nous avons besoin :\n> Stratégie\n> Analyse marché\n> Soutien opérations\n\n[INFO] Profil recherché :\n> Étudiant en école de commerce\n> Motivé par l\'univers startup et musique\n> Mentalité startup' :
            '> BUSINESS INTERNSHIP OPPORTUNITY\nAT HARMOS\nWe are building the future of music creation.\n\n[INFO] What we need:\n> Strategy\n> Market analysis\n> Operations support\n\n[INFO] Profile sought:\n> Business school student\n> Motivated by the startup and music universe\n> Startup mindset';
        } else { // other
          jobDescription = language === 'fr' ?
            '> OPPORTUNITÉ STAGE\nCHEZ HARMOS\nNous construisons l\'avenir de la création musicale.\n\n[INFO] Ce dont nous avons besoin :\n> Profil motivé\n> Envie de découvrir ARMOS\n> Mentalité startup' :
            '> INTERNSHIP OPPORTUNITY\nAT HARMOS\nWe are building the future of music creation.\n\n[INFO] What we need:\n> Motivated profile\n> Desire to discover ARMOS\n> Startup mindset';
        }
        
        // Créer un écouteur d'événement pour détecter quand l'animation de frappe est terminée
        const typingCompleteHandler = () => {
          // Attendre un court délai pour une meilleure expérience utilisateur
          setTimeout(() => {
            addMessage({
              type: 'text',
              content: getTranslation('namePrompt', language),
              sender: 'ai'
            });
            
            setCurrentStep('step_a_name');
            setIsBotWriting(false);
            
            // Supprimer l'écouteur d'événement après utilisation
            window.removeEventListener('typingComplete', typingCompleteHandler);
          }, 1000); // Attendre 1 seconde après la fin de l'animation
        };
        
        // Ajouter l'écouteur d'événement avant d'afficher le message de frappe
        window.addEventListener('typingComplete', typingCompleteHandler);
        
        addMessage({
          type: 'typing',
          content: jobDescription,
          sender: 'ai'
        });
        
        // Ne pas ajouter le message namePrompt ici, il sera ajouté par l'écouteur d'événement
        setIsBotWriting(false);
        break;
    }
  };

  const handleAgeQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('agePrompt', language),
      sender: 'ai'
    });
    
    setCurrentStep('step_a_age');
    setIsBotWriting(false);
  };

  const handleSchoolQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('schoolPrompt', language),
      sender: 'ai'
    });
    
    setCurrentStep('step_a_school');
    setIsBotWriting(false);
  };

  const handleStudyYearQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('studyYearPrompt', language),
      sender: 'ai'
    });
    
    setCurrentStep('step_a_study_year');
    setIsBotWriting(false);
  };

  const handleInternshipDurationQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('internshipDurationPrompt', language),
      sender: 'ai'
    });
    
    setCurrentStep('step_a_internship_duration');
    setIsBotWriting(false);
  };

  const handlePositionTypeQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('motivationPrompt', language),
      sender: 'ai'
    });
    
    setCurrentStep('step_a_motivation');
    setIsBotWriting(false);
  };

  const handleMusicQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('musicIntro', language),
      sender: 'ai'
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const popularSongs = [
      { title: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
      { title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock" },
      { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
      { title: "Billie Jean", artist: "Michael Jackson", genre: "Pop" },
      { title: "Hotel California", artist: "Eagles", genre: "Rock" },
      { title: "Someone Like You", artist: "Adele", genre: "Pop" },
      { title: "Watermelon Sugar", artist: "Harry Styles", genre: "Pop" },
      { title: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock" },
      { title: "Bad Guy", artist: "Billie Eilish", genre: "Pop" },
      { title: "Imagine", artist: "John Lennon", genre: "Rock" },
      { title: "Levitating", artist: "Dua Lipa", genre: "Pop" },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses", genre: "Rock" }
    ];
    
    addMessage({
      type: 'music_search',
      content: getTranslation('musicPrompt', language),
      sender: 'ai',
      musicSuggestions: popularSongs,
      multiSelect: true,
      maxSelections: 3
    });
    
    setCurrentStep('step_b_music');
    setIsBotWriting(false);
  };



  // Cette fonction a été déplacée plus bas



  const handleMusicSelect = async (songs: (MusicSuggestion | string)[]) => {
    // Disable all music search bubbles
    setMessages(prev => prev.map(msg => 
      msg.type === 'music_search' ? { ...msg, disabled: true } : msg
    ));
    
    const songTexts = songs.map(song => 
      typeof song === 'string' ? song : `${song.title} by ${song.artist}`
    );
    
    // Add user's selections
    addMessage({
      type: 'text',
      content: `My 3 favorite songs:\n${songTexts.map((song, i) => `${i + 1}. ${song}`).join('\n')}`,
      sender: 'user'
    });
    
    // Store all songs
    setUserAnswers(prev => ({ 
      ...prev, 
      song1: songTexts[0] || '',
      song2: songTexts[1] || '',
      song3: songTexts[2] || ''
    }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Go directly to free content question
    handleFreeContentQuestion();
  };

  const handleFreeContentQuestion = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addMessage({
      type: 'text',
      content: getTranslation('freeContentPrompt', language),
      sender: 'ai'
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addMessage({
      type: 'free_content',
      content: '',
      sender: 'ai'
    });
    
    setCurrentStep('step_c_files');
    setIsBotWriting(false);
  };

  // Fonction pour gérer la soumission du formulaire avec l'adresse email de destination
  const handleFreeContentSubmitWithEmail = async (content: string, files?: File[]) => {
    const submissionData = {
      ...userAnswers,
      portfolio: content,
      emailDestination: "lorenzo@harmos.xyz" // Adresse email fixe pour la destination
    };
    
    // Nouvelle logique : envoi via FormData à l'API
    try {
      const formData = new FormData();
      Object.entries(submissionData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('files', file, file.name);
        });
      }
      
      const response = await fetch('/api/sendCandidature', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        addMessage({
          type: 'text',
          content: getTranslation('candidatureSuccess', language),
          sender: 'ai'
        });
      } else {
        addMessage({
          type: 'text',
          content: getTranslation('candidatureError', language) || 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.',
          sender: 'ai'
        });
      }
    } catch (_error) {
      addMessage({
        type: 'text',
        content: 'Erreur lors de l\'envoi de la candidature.',
        sender: 'ai'
      });
    }
    setCurrentStep('completed');
  };
  
  const handleFreeContentSubmit = async (content: string, files?: File[]) => {
    setMessages(prev => prev.map(msg => 
      msg.type === 'free_content' ? { ...msg, disabled: true } : msg
    ));
    let userContent = '';
    if (content.trim()) {
      userContent += content.trim();
    }
    if (files && files.length > 0) {
      if (userContent) userContent += '\n\n';
      userContent += `Fichiers joints : ${files.map(f => f.name).join(', ')}`;
    }
    addMessage({
      type: 'text',
      content: userContent || 'Contenu partagé',
      sender: 'user'
    });
    
    // Stocker le contenu du portfolio dans userAnswers
    setUserAnswers(prev => ({
      ...prev,
      portfolio: content
    }));
    
    // Continuer directement avec la soumission
    await new Promise(resolve => setTimeout(resolve, 1000));
    addMessage({
      type: 'text',
      content: getTranslation('submitting', language) || 'Envoi de votre candidature en cours...',
      sender: 'ai'
    });
    
    // Appeler la fonction de soumission avec l'adresse email fixe
    handleFreeContentSubmitWithEmail(content, files);
  };



  const handleCheckboxSubmit = async (_selectedValues: string[], _githubUrl: string) => {
    // This function is kept for backward compatibility but should not be used
    // since we replaced checkboxes with free content
    console.warn('handleCheckboxSubmit called but should use handleFreeContentSubmit instead');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        handleUserMessage(userInput.trim());
      }
    }
  };

  return (
    <React95Provider>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#faf8f3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        <Frame
          style={{
            width: '95%',
            maxWidth: '900px',
            height: '95%',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            background: '#ffffff',
            boxShadow: '4px 4px 8px rgba(0,0,0,0.3)'
          }}
        >
          {/* Title Bar */}
          <div style={{
            background: 'linear-gradient(90deg, #FFA1EC 0%, #FF8EE8 100%)',
            color: 'white',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>💼 Harmos - Recrutement Stagiaires</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ width: '16px', height: '14px', background: '#ffffff', border: '1px outset #ffffff', fontSize: '8px', textAlign: 'center', lineHeight: '12px', color: 'black' }}>_</div>
              <div style={{ width: '16px', height: '14px', background: '#ffffff', border: '1px outset #ffffff', fontSize: '8px', textAlign: 'center', lineHeight: '12px', color: 'black' }}>□</div>
              <div style={{ width: '16px', height: '14px', background: '#ffffff', border: '1px outset #ffffff', fontSize: '8px', textAlign: 'center', lineHeight: '12px', color: 'black' }}>×</div>
            </div>
          </div>

          {/* Chat Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            backgroundImage: 'url(/Fondsable.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '2px inset #ffffff'
          }}>
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '12px',
            background: 'transparent'
          }}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <ChatMessageList
                    messages={messages}
                    onButtonClick={handleButtonClick}
                    onCheckboxSubmit={handleCheckboxSubmit}
                    onMusicSelect={handleMusicSelect}
                    onFreeContentSubmit={handleFreeContentSubmit}
                    onLanguageSelect={handleLanguageChange}
                    currentLanguage={language}
                  />
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ 
                    background: '#ffffff', 
                    border: '2px inset #ffffff', 
                    padding: '8px', 
                    maxWidth: '200px',
                    fontFamily: 'MS Sans Serif, sans-serif',
                    fontSize: '11px'
                  }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', background: '#808080', borderRadius: '50%' }}></div>
                      <div style={{ width: '8px', height: '8px', background: '#808080', borderRadius: '50%' }}></div>
                      <div style={{ width: '8px', height: '8px', background: '#808080', borderRadius: '50%' }}></div>
                      <span style={{ marginLeft: '4px', color: '#000000' }}>En cours de frappe...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area - Enhanced */}
          {currentStep !== 'completed' && (
            <div style={{ borderTop: '1px solid #ffffff', padding: '8px', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Input field */}
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation('inputPlaceholder', language)}
                  disabled={currentStep === 'job_description' || isBotWriting}
                  style={{ flex: 1 }}
                />
                
                {/* Send button */}
                <Button
                  onClick={() => userInput.trim() && handleUserMessage(userInput.trim())}
                  disabled={!userInput.trim() || currentStep === 'job_description' || isBotWriting}
                >
                  Envoyer
                </Button>
              </div>
            </div>
          )}
          </div>
        </Frame>
      </div>
    </React95Provider>
  );
}
