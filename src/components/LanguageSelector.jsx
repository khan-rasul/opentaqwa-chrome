/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { X, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSelector = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage();

  if (!isOpen) return null;

  const languages = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      description: "Roman transliteration",
    },
    {
      code: "ar",
      name: "Arabic",
      nativeName: "العربية",
      description: "Arabic text",
    },
  ];

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center h-full justify-center p-4">
      <div className="bg-gradient-to-r from-slate-600/30 to-slate-700/20 rounded-2xl shadow-2xl border border-white/10 max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white font-quicksand">
            Select Language
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Language Options */}
        <div className="p-6 space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                language === lang.code
                  ? "bg-gold/20 border border-gold/30 text-white"
                  : "bg-white/5 hover:bg-white/10 border border-transparent text-white/80 hover:text-white"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-semibold font-montserrat">
                  {lang.name}
                </span>
                <span
                  className={`text-sm ${
                    language === lang.code ? "text-white/90" : "text-white/60"
                  }`}
                >
                  {lang.nativeName}
                </span>
                <span
                  className={`text-xs ${
                    language === lang.code ? "text-white/70" : "text-white/50"
                  }`}
                >
                  {lang.description}
                </span>
              </div>
              {language === lang.code && (
                <Check className="w-5 h-5 text-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-xs text-white/60 text-center font-montserrat">
            This affects transliteration display. Meanings remain in English.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
