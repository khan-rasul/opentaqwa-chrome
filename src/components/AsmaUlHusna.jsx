/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { BookOpen, RefreshCw, Heart, Share2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useDailyName } from "../hooks/useDailyName";
import { useContentLength } from "../hooks/useContentLength";
import { getTextSize } from "../utils/responsiveUtils";
import { shareContent, formatters } from "../utils/shareUtils";
import Tooltip from "./Tooltip";

const AsmaUlHusna = () => {
  const { dailyName, loading, error } = useDailyName();
  const [isFavorited, setIsFavorited] = useState(false);

  // Calculate content length
  const contentLength = useContentLength(dailyName, (content) => {
    const summaryLength = content.summary?.length || 0;
    const meaningLength = content.meaning?.length || 0;
    return summaryLength + meaningLength;
  });

  // Handle share functionality
  const handleShare = () => {
    shareContent("Name of Allah", dailyName, formatters.asmaUlHusna);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-forest to-forest/20 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg font-medium">
              Loading divine name...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !dailyName) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 rounded-xl shadow-xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-white text-lg font-medium">
              Failed to load divine name
            </div>
            <div className="text-white/60 text-sm">Using fallback name</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-plum-light/60 to-plum-light/10 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] xl:min-h-[36rem] 2xl:min-h-[40rem]">
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
                Divine Name of the Day
              </h1>
              <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat">
                Asma'ul Ḥusnā
              </p>
            </div>
            <Tooltip content="Work in progress" position="left">
              <button className="p-1 sm:p-1.5 md:p-2 hover:bg-white/10  rounded-full transition-colors">
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 fill-white/20 drop-shadow-md text-white/70 hover:text-white " />
              </button>
            </Tooltip>
          </div>

          {/* Main Content - Arabic, English, Meaning, and Summary */}
          <div className="text-center flex-1 flex flex-col justify-center px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 2xl:py-10">
            {/* Arabic Name */}
            <div
              className={`text-white font-light leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 break-words ${getTextSize(
                "arabic",
                contentLength
              )}`}
              dir="rtl"
              style={{ lineHeight: "1.6" }}
            >
              {dailyName?.arabic}
            </div>

            {/* English Transliteration */}
            <div
              className={`text-white/90 font-great-vibes mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 break-words  ${getTextSize(
                "english",
                contentLength
              )}`}
            >
              {dailyName?.english}
            </div>

            {/* Meaning */}
            <p
              className={`text-white/90 font-light font-montserrat mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 italic break-words leading-relaxed ${getTextSize(
                "meaning",
                contentLength
              )}`}
            >
              "{dailyName?.meaning}"
            </p>

            {/* Summary/Description */}
            <p
              className={`text-white/85 font-light font-montserrat break-words leading-relaxed ${getTextSize(
                "summary",
                contentLength,
                true
              )}`}
            >
              {dailyName?.summary}
            </p>
          </div>

          {/* Footer - Actions & Link */}
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
                title="Share name"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/80" />
                <span className="text-white/90 font-medium font-montserrat text-xs sm:text-sm md:text-base">
                  Share
                </span>
              </button>
            </div>

            {/* Link Attribution */}
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-white/50 flex-shrink-0" />
                <a
                  href={`https://reminder.dev/names/${dailyName?.number || 1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/80 text-xs sm:text-sm font-light font-montserrat transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>Learn more about this divine name</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsmaUlHusna;
