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
import { RefreshCw } from "lucide-react";
import Tooltip from "./Tooltip";
import { duroodList } from "@opentaqwa/shared";
import { useLanguage } from "../contexts/LanguageContext";

const Durood = () => {
  const [duroodCount, setDuroodCount] = useState(0);
  const { language } = useLanguage();
  const currentDurood = duroodList[duroodCount % duroodList.length];

  // Helper function to get the display text based on language
  const getDisplayText = (durood) => {
    if (language === "ar") {
      return durood.arabic; // Show Arabic text when Arabic is selected
    }
    return durood.transliteration; // Show English transliteration when English is selected
  };

  const displayText = getDisplayText(currentDurood);

  return (
    <div
      className="bg-gradient-to-r from-forest to-forest/20 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 w-full h-full flex flex-col cursor-pointer relative overflow-hidden"
      onClick={() => setDuroodCount(duroodCount + 1)}
    >
      {/* Responsive background decoration */}
      <div className="absolute top-8 sm:top-10 md:top-16 lg:top-20 xl:top-24 2xl:top-32 left-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white/10 rounded-full -translate-y-2 sm:-translate-y-3 md:-translate-y-4 lg:-translate-y-4 xl:-translate-y-4 2xl:-translate-y-6 -translate-x-2 sm:-translate-x-3 md:-translate-x-4 lg:-translate-x-4 xl:-translate-x-4 2xl:-translate-x-6"></div>
      <div className="absolute top-1 sm:top-1.5 md:top-2 right-8 sm:right-10 md:right-16 lg:right-20 xl:right-24 2xl:right-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 bg-white/5 rounded-full translate-y-1 sm:translate-y-1.5 md:translate-y-2 lg:translate-y-3 xl:translate-y-3 2xl:translate-y-4 -translate-x-1 sm:-translate-x-1.5 md:-translate-x-2 lg:-translate-x-3 xl:-translate-x-3 2xl:-translate-x-4"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 bg-white/5 rounded-full"></div>

      {/* Content Container - Ensures proper spacing within padding */}
      <div className="flex flex-col h-full justify-between relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="min-w-0 flex-1 mr-2 sm:mr-3 md:mr-4">
            <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-quicksand mb-1 sm:mb-1.5 md:mb-2">
              Durūd
            </h1>
            <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat">
              Blessings upon Prophet ﷺ
            </p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2.5 xl:space-x-3 flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3">
              <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-montserrat">
                {duroodCount}
              </span>
            </div>
            <Tooltip content="Reset Durood count" position="left">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDuroodCount(0);
                }}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 fill-white/20 drop-shadow-md text-white/70 hover:text-white" />
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
            "{currentDurood.meaning}"
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2 xl:space-x-2 2xl:space-x-3">
              {duroodList.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 rounded-full transition-all duration-300 flex-shrink-0 ${
                    index === duroodCount % duroodList.length
                      ? "bg-white"
                      : "bg-white/30"
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

export default Durood;
