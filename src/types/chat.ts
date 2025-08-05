export type MessageType = 'text' | 'video' | 'typing' | 'buttons' | 'checkboxes' | 'music_search' | 'free_content' | 'language_selector';

export type Language = 'fr' | 'en';

export type FlowStep = 
  | 'welcome'
  | 'video_shown'
  | 'video_watched'
  | 'job_description'
  | 'step_a_name'
  | 'step_a_email'
  | 'step_a_age'
  | 'step_a_school'
  | 'step_a_study_year'
  | 'step_a_internship_duration'
  | 'step_a_position_type'
  | 'step_a_motivation'
  | 'step_b_music'
  | 'step_c_files'
  | 'completed';

export interface Button {
  text: string;
  value: string;
}

export interface Checkbox {
  text: string;
  value: string;
}

export interface MusicSuggestion {
  title: string;
  artist: string;
  genre: string;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: 'user' | 'bot' | 'ai';
  timestamp: Date;
  buttons?: Button[];
  checkboxes?: Checkbox[];
  musicSuggestions?: MusicSuggestion[];
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
  files?: File[];
}

export interface ChatMessageListProps {
  messages: Message[];
  onButtonClick: (value: string, text: string) => Promise<void>;
  onCheckboxSubmit: (selectedValues: string[], githubUrl: string) => Promise<void>;
  onMusicSelect: (songs: (MusicSuggestion | string)[]) => void;
  onFreeContentSubmit?: (content: string, files?: File[]) => void;
  onLanguageSelect?: (language: Language) => void;
  currentLanguage?: Language;
}