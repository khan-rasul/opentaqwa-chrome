/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState } from "react";
import { Heart } from "lucide-react";
import Tooltip from "./Tooltip";
import { duaList } from "@opentaqwa/shared";
import { useLanguage } from "../contexts/LanguageContext";

const Dua = () => {
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const { language } = useLanguage();
  const currentDua = duaList[currentDuaIndex];

  // Helper function to get the display text based on language
  const getDisplayText = (dua) => {
    if (language === "ar") {
      return dua.arabic; // Show Arabic text when Arabic is selected
    }
    return dua.transliteration; // Show English transliteration when English is selected
  };

  const handleCardClick = () => {
    setCurrentDuaIndex((currentDuaIndex + 1) % duaList.length);
  };

  const displayText = getDisplayText(currentDua);

  return (
    <div
      className="bg-gradient-to-r from-plum to-plum/20 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 w-full h-full flex flex-col cursor-pointer relative overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Responsive background decorations */}
      <div className="absolute top-2 sm:top-3 md:top-4 lg:top-6 xl:top-8 2xl:top-10 right-3 sm:right-4 md:right-6 lg:right-8 xl:right-10 2xl:right-12 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 bg-white/6 rounded-full"></div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 2xl:bottom-16 left-2 sm:left-3 md:left-4 lg:left-6 xl:left-8 2xl:left-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 bg-white/4 rounded-full"></div>
      <div className="absolute top-1/2 right-1 sm:right-2 md:right-3 lg:right-4 xl:right-6 2xl:right-8 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 bg-white/5 rounded-full transform -translate-y-1/2"></div>
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 xl:bottom-8 2xl:bottom-10 right-1/4 sm:right-1/3 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 bg-white/3 rounded-full"></div>

      {/* Content Container - Ensures proper spacing within padding */}
      <div className="flex flex-col h-full justify-between relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="min-w-0 flex-1 mr-2 sm:mr-3 md:mr-4">
            <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-quicksand mb-1 sm:mb-1.5 md:mb-2">
              Du'ā
            </h1>
            <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat">
              {currentDua.category}
            </p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2.5 xl:space-x-3 flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3">
              <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-montserrat">
                {currentDuaIndex + 1}
              </span>
            </div>
            <Tooltip content="Work in progress" position="left">
              <button className="p-1 sm:p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 fill-white/20 drop-shadow-md text-white/70 hover:text-white" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Main Text - Takes up available space with enhanced word breaking */}
        <div className="text-center flex-1 flex flex-col justify-center px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 min-h-0">
          <div
            className={`text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl break-words hyphens-auto ${
              language === "ar"
                ? "font-light leading-tight"
                : "font-medium font-great-vibes leading-none"
            }`}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          >
            {displayText}
          </div>
        </div>

        {/* Footer - Fixed at bottom with proper spacing */}
        <div className="text-center flex-shrink-0 mt-2 sm:mt-3 md:mt-4">
          <p className="text-white/70 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg italic font-light font-montserrat mb-2 sm:mb-2.5 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-4 break-words px-1 sm:px-2">
            "{currentDua.meaning}"
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2 xl:space-x-2 2xl:space-x-3">
              {duaList.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 rounded-full transition-all duration-300 flex-shrink-0 ${
                    index === currentDuaIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dua;
