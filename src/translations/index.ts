import { Language } from '../types/chat';

type TranslationKey = 
  | 'welcome'
  | 'startPrompt'
  | 'videoIntro'
  | 'videoWatchPrompt'
  | 'jobDescriptionIntro'
  | 'jobDescription'
  | 'interestedButton'
  | 'namePrompt'
  | 'invalidNamePrompt'
  | 'emailPrompt'
  | 'invalidEmailPrompt'
  | 'agePrompt'
  | 'invalidAgePrompt'
  | 'schoolPrompt'
  | 'invalidSchoolPrompt'
  | 'studyYearPrompt'
  | 'invalidStudyYearPrompt'
  | 'internshipDurationPrompt'
  | 'invalidInternshipDurationPrompt'
  | 'positionTypePrompt'
  | 'designOption'
  | 'communicationOption'
  | 'techOption'
  | 'businessOption'
  | 'otherOption'
  | 'motivationPrompt'
  | 'invalidMotivationPrompt'
  | 'candidatureError'
  | 'musicIntro'
  | 'musicPrompt'
  | 'freeContentPrompt'
  | 'candidatureSuccess'
  | 'inputPlaceholder'
  | 'submitting'
  | 'freeContentTitle'
  | 'freeContentDescription'
  | 'yourMessage'
  | 'messagePlaceholder'
  | 'dragDropFiles'
  | 'dragDropDescription'
  | 'selectedFiles'
  | 'readyToSend'
  | 'unknownType'
  | 'uploadInProgress'
  | 'addContentToSend'
  | 'sendProfile';

type Translations = {
  [key in TranslationKey]: {
    fr: string;
    en: string;
  };
};

export const translations: Translations = {
  welcome: {
    fr: 'Hola! Bienvenue chez Harmos.',
    en: 'Hello! Welcome to Harmos.'
  },
  startPrompt: {
    fr: 'Tapez **Commencer** pour regarder la vidéo de présentation et voir si ça match !!',
    en: 'Type **Start** to watch the presentation video and see if it matches!!'
  },
  videoIntro: {
    fr: 'Voici une courte vidéo sur Harmos 🎬',
    en: 'Here is a short video about Harmos 🎬'
  },
  videoWatchPrompt: {
    fr: 'Tapez "vu" quand vous avez fini de regarder la vidéo pour continuer.',
    en: 'Type "seen" when you have finished watching the video to continue.'
  },
  jobDescriptionIntro: {
    fr: 'Maintenant, laissez-moi vous montrer la description du poste',
    en: 'Now, let me show you the job description'
  },
  jobDescription: {
    fr: `> OPPORTUNITÉ DE STAGE CHEZ HARMOS\n\n` +
        `Harmos construit le futur du contenu jouable et immersif.\n` +
        `On commence par la musique, mais on vise bien plus large.\n\n` +
        `[INFO] Ce que nous recherchons :\n` +
        `> Des stagiaires passionnés et créatifs\n` +
        `> Des profils en Design, Communication, Tech ou Business\n` +
        `> Une envie d'apprendre et de contribuer à un projet innovant\n\n` +
        `[INFO] Ce que tu vas découvrir :\n` +
        `> Une startup en pleine croissance\n` +
        `> Des projets concrets et impactants\n` +
        `> Une équipe jeune et dynamique\n` +
        `> Une culture d'innovation et d'expérimentation\n\n` +
        `[INFO] Avantages : Flexibilité. Responsabilités réelles. Expérience startup.\n\n` +
        `[INFO] Prêt(e) à rejoindre l'aventure ?`,
    en: `> INTERNSHIP OPPORTUNITY AT HARMOS\n\n` +
        `Harmos builds the future of playable and immersive content.\n` +
        `We start with music, but we aim much broader.\n\n` +
        `[INFO] What we're looking for:\n` +
        `> Passionate and creative interns\n` +
        `> Profiles in Design, Communication, Tech or Business\n` +
        `> Eagerness to learn and contribute to an innovative project\n\n` +
        `[INFO] What you'll discover:\n` +
        `> A growing startup\n` +
        `> Concrete and impactful projects\n` +
        `> A young and dynamic team\n` +
        `> A culture of innovation and experimentation\n\n` +
        `[INFO] Benefits: Flexibility. Real responsibilities. Startup experience.\n\n` +
        `[INFO] Ready to join the adventure?`
  },
  interestedButton: {
    fr: 'Je veux postuler',
    en: 'I want to apply'
  },
  namePrompt: {
    fr: 'Parfait ! Commençons par quelques informations de base.\n\nQuel est votre prénom ?',
    en: 'Perfect! Let\'s start with some basic information.\n\nWhat is your first name?'
  },
  invalidNamePrompt: {
    fr: 'Veuillez entrer un prénom valide (au moins 2 caractères).',
    en: 'Please enter a valid first name (at least 2 characters).'
  },
  emailPrompt: {
    fr: 'Enchanté {name} ! Maintenant, quelle est votre adresse email ?',
    en: 'Nice to meet you, {name}! Now, what is your email address?'
  },
  invalidEmailPrompt: {
    fr: 'Veuillez entrer une adresse email valide (ex: nom@exemple.com).',
    en: 'Please enter a valid email address (e.g., name@example.com).'
  },
  agePrompt: {
    fr: 'Quel est ton âge ?',
    en: 'What is your age?'
  },
  invalidAgePrompt: {
    fr: 'Veuillez entrer un âge valide.',
    en: 'Please enter a valid age.'
  },
  schoolPrompt: {
    fr: 'Dans quelle école ou formation étudies-tu ?',
    en: 'Which school or program are you studying at?'
  },
  invalidSchoolPrompt: {
    fr: 'Veuillez entrer une école ou formation valide.',
    en: 'Please enter a valid school or program.'
  },
  studyYearPrompt: {
    fr: 'En quelle année d\'étude es-tu ? (ex: 1ère année, 2ème année, Master...)',
    en: 'What year of study are you in? (e.g., 1st year, 2nd year, Master\'s...)'
  },
  invalidStudyYearPrompt: {
    fr: 'Veuillez entrer une année d\'étude valide.',
    en: 'Please enter a valid year of study.'
  },
  internshipDurationPrompt: {
    fr: 'Quelle est la durée de stage souhaitée et tes dates disponibles ?',
    en: 'What is your desired internship duration and your available dates?'
  },
  invalidInternshipDurationPrompt: {
    fr: 'Veuillez entrer des informations valides sur la durée et les dates de stage.',
    en: 'Please enter valid information about internship duration and dates.'
  },
  positionTypePrompt: {
    fr: 'Quel type de poste recherches-tu ?',
    en: 'What type of position are you looking for?'
  },
  designOption: {
    fr: 'Design',
    en: 'Design'
  },
  communicationOption: {
    fr: 'Communication',
    en: 'Communication'
  },
  techOption: {
    fr: 'Tech',
    en: 'Tech'
  },
  businessOption: {
    fr: 'Business',
    en: 'Business'
  },
  otherOption: {
    fr: 'Autre',
    en: 'Other'
  },
  motivationPrompt: {
    fr: 'Quelle est ta motivation pour rejoindre Harmos en tant que stagiaire ?',
    en: 'What is your motivation to join Harmos as an intern?'
  },
  musicIntro: {
    fr: 'Découvrons votre univers musical ! La musique en dit long sur votre personnalité et votre créativité.',
    en: 'Let\'s discover your musical universe! Music says a lot about your personality and creativity.'
  },
  musicPrompt: {
    fr: 'Sélectionnez vos 3 chansons préférées (vous pouvez rechercher ou choisir parmi les suggestions) :',
    en: 'Select your 3 favorite songs (you can search or choose from the suggestions):'
  },
  freeContentPrompt: {
    fr: 'C\'est maintenant votre moment ! Partagez tout ce qui vous représente en tant que candidat.',
    en: 'This is your moment! Share everything that represents you as a candidate.'
  },
  candidatureSuccess: {
    fr: 'Merci d\'avoir postulé pour un stage chez HARMOS ! Nous te contacterons très vite.',
    en: 'Thank you for applying for an internship at HARMOS! We will contact you very soon.'
  },
  invalidMotivationPrompt: {
    fr: 'Veuillez entrer une motivation valide.',
    en: 'Please enter a valid motivation.'
  },
  candidatureError: {
    fr: 'Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.',
    en: 'An error occurred while sending your application. Please try again.'
  },
  inputPlaceholder: {
    fr: 'Écrire un message',
    en: 'Write a message'
  },
  submitting: {
    fr: 'Envoi de votre candidature en cours...',
    en: 'Submitting your application...'
  },
  freeContentTitle: {
    fr: 'Espace libre du candidat',
    en: 'Candidate Free Space'
  },
  freeContentDescription: {
    fr: 'Partagez tout ce que vous voulez : liens GitHub, CV, vidéos démo, projets, ou tout autre élément qui vous représente.',
    en: 'Share anything you want: GitHub links, CV, demo videos, projects, or any other element that represents you.'
  },
  yourMessage: {
    fr: 'Votre message :',
    en: 'Your message:'
  },
  messagePlaceholder: {
    fr: 'Collez vos liens GitHub, décrivez vos projets, partagez votre vision...',
    en: 'Paste your GitHub links, describe your projects, share your vision...'
  },
  dragDropFiles: {
    fr: 'Glissez-déposez vos fichiers ici',
    en: 'Drag and drop your files here'
  },
  dragDropDescription: {
    fr: 'CV, vidéos, images, documents... Aucune restriction de format',
    en: 'CV, videos, images, documents... No format restrictions'
  },
  selectedFiles: {
    fr: 'Fichiers sélectionnés :',
    en: 'Selected files:'
  },
  readyToSend: {
    fr: '✓ Prêt à envoyer',
    en: '✓ Ready to send'
  },
  unknownType: {
    fr: 'Type inconnu',
    en: 'Unknown type'
  },
  uploadInProgress: {
    fr: 'Upload en cours...',
    en: 'Upload in progress...'
  },
  addContentToSend: {
    fr: 'Ajoutez du contenu pour envoyer',
    en: 'Add content to send'
  },
  sendProfile: {
    fr: 'Envoyer mon profil',
    en: 'Send my profile'
  }
};

export const getTranslation = (key: TranslationKey, language: Language, replacements?: Record<string, string>): string => {
  let translation = translations[key][language];
  
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value);
    });
  }
  
  return translation;
};