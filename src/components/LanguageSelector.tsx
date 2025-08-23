import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, availableLanguages } from '@/hooks/useLanguage';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isLoading, suggestedLanguage } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center space-x-2 text-sm font-medium hover:text-gray-600 transition-colors duration-200 ${
            suggestedLanguage ? 'border-2 border-red-500 animate-pulse shadow-lg shadow-red-500/30' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="w-4 h-4" />
          <span>{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom" className="w-48 md:w-auto z-[120] bg-popover border shadow-lg">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language)}
            className={`flex items-center space-x-3 px-3 py-2 cursor-pointer ${
              currentLanguage.code === language.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            <span className="text-xs text-gray-500 uppercase">{language.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;