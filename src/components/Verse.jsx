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
import { BookOpen, RefreshCw, Heart, Share2 } from "lucide-react";
import { useDailyVerse } from "../hooks/useDailyVerse";
import { useContentLength } from "../hooks/useContentLength";
import { getTextSize } from "../utils/responsiveUtils";
import { shareContent, formatters } from "../utils/shareUtils";
import Tooltip from "./Tooltip";

const Verse = () => {
  const { verse, loading, error, refreshVerse } = useDailyVerse();
  const [isFavorited, setIsFavorited] = useState(false);

  // Calculate verse length
  const verseLength = useContentLength(verse, (content) => {
    const arabicLength = content.arabic?.length || 0;
    const englishLength = content.english?.length || 0;
    return arabicLength + englishLength;
  });

  // Handle share functionality
  const handleShare = () => {
    shareContent("Quranic Verse", verse, formatters.verse);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-gold to-gold/20 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg font-medium">
              Loading verse...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !verse) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 rounded-xl shadow-xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-white text-lg font-medium">
              Failed to load verse
            </div>
            <button
              onClick={refreshVerse}
              className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-forest-light/60 to-forest-light/10 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
        {/* Responsive background decoration */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white/6 rounded-full -translate-y-2 sm:-translate-y-3 md:-translate-y-4 lg:-translate-y-4 xl:-translate-y-4 2xl:-translate-y-5 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-4 xl:translate-x-4 2xl:translate-x-5"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 bg-white/4 rounded-full translate-y-1 sm:translate-y-1.5 md:translate-y-2 lg:translate-y-2 xl:translate-y-2 2xl:translate-y-4 -translate-x-1 sm:-translate-x-1.5 md:-translate-x-2 lg:-translate-x-2 xl:-translate-x-2 2xl:-translate-x-4"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 bg-white/5 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-5 md:right-6 lg:right-7 xl:right-8 2xl:right-10 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 bg-white/6 rounded-full"></div>

        {/* Content Container - Flexible height */}
        <div className="flex flex-col h-full justify-between relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start flex-shrink-0 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10">
            <div className="min-w-0 flex-1 mr-2 sm:mr-3 md:mr-4">
              <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-quicksand mb-1 sm:mb-1.5 md:mb-2">
                Āyah of the Day
              </h1>
              <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat">
                Daily Quranic Reflection
              </p>
            </div>
            <Tooltip content="Refresh" position="left">
              <button
                onClick={refreshVerse}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 fill-white/20 drop-shadow-md text-white/70 hover:text-white" />
              </button>
            </Tooltip>
          </div>

          {/* Main Content - Arabic and English Text */}
          <div className="text-center flex-1 flex flex-col justify-center px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 2xl:py-10">
            {/* Arabic Text - RTL */}
            <div
              className={`text-white font-light leading-relaxed mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 break-words ${getTextSize(
                "arabic",
                verseLength,
                true
              )}`}
              dir="rtl"
              style={{ lineHeight: "1.8" }}
            >
              {verse?.arabic}
            </div>

            {/* English Translation */}
            <p
              className={`text-white/85 font-light font-montserrat mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 break-words leading-relaxed ${getTextSize(
                "english",
                verseLength,
                true
              )}`}
            >
              "{verse?.english}"
            </p>

            {/* Reference */}
            <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat break-words">
              {verse?.reference}
            </p>
          </div>

          {/* Footer - Actions & Attribution */}
          <div className="flex-shrink-0 mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-7 space-y-3 sm:space-y-4 md:space-y-5">
            {/* Action Buttons */}
            <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-5">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Add to favorites"
              >
                <Heart
                  className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                    isFavorited ? "text-red-400 fill-red-400" : "text-white/80"
                  }`}
                />
                <span className="text-white/90 font-medium font-montserrat text-xs sm:text-sm md:text-base">
                  {isFavorited ? "Saved" : "Save"}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Share verse"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/80" />
                <span className="text-white/90 font-medium font-montserrat text-xs sm:text-sm md:text-base">
                  Share
                </span>
              </button>
            </div>

            {/* Translation Attribution */}
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white/50 flex-shrink-0" />
                <p className="text-white/60 text-xs sm:text-sm font-light font-montserrat">
                  Translation by Muhammad Taqi-ud-Din al-Hilali & Muhammad
                  Muhsin Khan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verse;
