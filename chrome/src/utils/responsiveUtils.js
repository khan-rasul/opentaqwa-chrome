/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

// Text size configurations
const TEXT_SIZES = {
  arabic: {
    dynamic: {
      "very-long":
        "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
      long: "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
      medium:
        "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
      default:
        "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
    },
    fixed:
      "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl",
  },
  english: {
    dynamic: {
      "very-long":
        "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl",
      long: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
      medium:
        "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
      default:
        "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
    },
    fixed:
      "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl",
  },
  meaning: {
    fixed:
      "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
  },
  summary: {
    dynamic: {
      "very-long":
        "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl",
      long: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
      default:
        "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl",
    },
  },
};

export const getTextSize = (type, contentLength, isDynamic = false) => {
  const sizeConfig = TEXT_SIZES[type];

  if (!sizeConfig) return "";

  if (isDynamic && sizeConfig.dynamic) {
    return sizeConfig.dynamic[contentLength] || sizeConfig.dynamic.default;
  }

  return sizeConfig.fixed || "";
};
