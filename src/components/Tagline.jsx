/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import React from "react";

const Tagline = () => (
  <div className="p-2 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-10 w-full h-full relative overflow-hidden">
    {/* Responsive decorative elements */}
    <div className="absolute top-2 sm:top-3 md:top-4 lg:top-5 xl:top-6 2xl:top-8 right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 2xl:right-8 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 bg-stone-300/20 rounded-full"></div>
    <div className="absolute bottom-2 sm:bottom-4 md:bottom-5 lg:bottom-6 xl:bottom-7 2xl:bottom-10 left-1 sm:left-1.5 md:left-2 lg:left-2.5 xl:left-3 2xl:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 bg-stone-400/15 rounded-full"></div>
    <div className="absolute top-2/3 right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 2xl:right-9 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 bg-stone-500/10 rounded-full transform -translate-y-1/2"></div>

    {/* Responsive right border accent */}
    <div className="absolute right-1 sm:right-1.5 md:right-2 lg:right-2.5 xl:right-3 2xl:right-4 top-1/2 w-0.5 sm:w-0.5 md:w-1 lg:w-1 xl:w-1.5 2xl:w-2 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-20 bg-gradient-to-b from-gold to-gold-600/20 rounded-full transform -translate-y-1/2"></div>

    {/* Content Container - Centered with left-aligned text */}
    <div className="flex items-center justify-center h-full relative z-10">
      <div className="text-left max-w-full w-full px-1 sm:px-2">
        <h1 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2.5 2xl:mb-3 tracking-wide font-montserrat text-white/90">
          Companion for the Ummah
        </h1>

        {/* Brand Name with Logo */}
        <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 md:space-x-2.5 lg:space-x-3 xl:space-x-3.5 2xl:space-x-5">
          {/* Logo */}
          <img
            src="icon.png"
            alt="OpenTaqwā Logo"
            className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20 drop-shadow-lg flex-shrink-0"
          />

          {/* Brand Name */}
          <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-montserrat text-white leading-tight">
            Open
            <span className="text-gold-light font-great-vibes">Taqwā</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
);

export default Tagline;
