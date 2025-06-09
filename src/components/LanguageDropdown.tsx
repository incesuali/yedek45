import { useState } from 'react';
import TurkishFlag from './TurkishFlag';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1.5 py-1 hover:bg-green-400 rounded-sm text-white"
      >
        {selectedLang.code === 'tr' ? (
          <TurkishFlag className="w-4 h-4" />
        ) : (
          <span className="inline-block w-4 h-4 rounded-full overflow-hidden text-[13px] leading-4">{selectedLang.flag}</span>
        )}
        <span className="text-[15px] font-medium">{selectedLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg py-1 w-32 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
            >
              {lang.code === 'tr' ? (
                <TurkishFlag className="w-4 h-4" />
              ) : (
                <span className="inline-block w-4 h-4 rounded-full overflow-hidden text-[13px] leading-4">{lang.flag}</span>
              )}
              <span className="text-sm text-gray-700">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 