import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCountryDetection } from './useCountryDetection';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const availableLanguages: Language[] = [
  { code: 'en-us', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt-br', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh-cn', name: '简体中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  isLoading: boolean;
  suggestedLanguage?: Language;
  dismissSuggestion: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const countryLanguageMap: Record<string, string> = {
  'US': 'en-us', 'CA': 'en-us', 'GB': 'en-gb', 'IE': 'en-gb', 'AU': 'en-gb', 'NZ': 'en-gb',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es', 'CL': 'es',
  'BR': 'pt-br', 'PT': 'pt-br',
  'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr',
  'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'JO': 'ar', 'LB': 'ar',
  'IN': 'hi', 'CN': 'zh-cn', 'KR': 'ko', 'JP': 'ja', 'IT': 'it'
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(availableLanguages[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedLanguage, setSuggestedLanguage] = useState<Language | undefined>();
  const { countryCode } = useCountryDetection();

  const detectBrowserLanguage = (): Language | null => {
    const browserLanguages = navigator.languages || [navigator.language];
    
    for (const browserLang of browserLanguages) {
      const normalizedLang = browserLang.toLowerCase();
      const matchedLanguage = availableLanguages.find(lang => 
        lang.code.toLowerCase() === normalizedLang ||
        lang.code.toLowerCase().startsWith(normalizedLang.split('-')[0])
      );
      if (matchedLanguage) return matchedLanguage;
    }
    return null;
  };

  useEffect(() => {
    const savedLanguageCode = localStorage.getItem('preferred-language');
    const suggestionDismissed = localStorage.getItem('language-suggestion-dismissed');
    
    if (savedLanguageCode) {
      // User has explicit choice - respect it
      const savedLanguage = availableLanguages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } else {
      // First visit - try browser language
      const browserLanguage = detectBrowserLanguage();
      if (browserLanguage) {
        setCurrentLanguage(browserLanguage);
        localStorage.setItem('preferred-language', browserLanguage.code);
      }
    }

    // Suggest language based on location if different from current and not dismissed
    if (countryCode && !suggestionDismissed) {
      const countryLanguageCode = countryLanguageMap[countryCode];
      if (countryLanguageCode) {
        const countryLanguage = availableLanguages.find(lang => lang.code === countryLanguageCode);
        if (countryLanguage && countryLanguage.code !== currentLanguage.code) {
          setSuggestedLanguage(countryLanguage);
        }
      }
    }
    
    setIsLoading(false);
  }, [countryCode, currentLanguage.code]);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language.code);
    setSuggestedLanguage(undefined); // Clear suggestion when user makes choice
    
    // Update document language attribute
    document.documentElement.lang = language.code;
    
    console.log('Language changed to:', language.code);
  };

  const dismissSuggestion = () => {
    setSuggestedLanguage(undefined);
    localStorage.setItem('language-suggestion-dismissed', 'true');
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      isLoading, 
      suggestedLanguage,
      dismissSuggestion 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}