/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { MapPin, Settings } from "lucide-react";
import Tooltip from "../Tooltip";
import {
  formatPrayerTimesForDisplay,
  getTimeUntilNextPrayer,
} from "../../utils/prayerUtils";
import { getLocationString } from "../../utils/locationUtils";
import { useLocation } from "../../contexts/LocationContext";
import { usePrayerTimes } from "../../hooks/usePrayerTimes";
import { useEffect, useState } from "react";
import { usePrayerNotifications } from "../../hooks/usePrayerNotifications";

const BACKGROUND_IMAGE_URL =
  "https://images.pexels.com/photos/33759665/pexels-photo-33759665.jpeg?_gl=1*lcmmth*_ga*MzcyMzEyMjQ1LjE3NTcwMjMyMTM.*_ga_8JE65Q40S6*czE3NTcwMjMyMTMkbzEkZzEkdDE3NTcwMjMyMzgkajM1JGwwJGgw";

const Front = ({ onFlip }) => {
  const { location } = useLocation();
  const { prayerTimes: prayerData } = usePrayerTimes(location);

  const prayerTimes = formatPrayerTimesForDisplay(
    prayerData?.data?.timings || null
  );

  usePrayerNotifications(prayerData?.data?.timings || null);

  const nextPrayer = prayerTimes.find((prayer) => prayer.next);
  const countdown = nextPrayer
    ? getTimeUntilNextPrayer(nextPrayer.time)
    : "00:00:00";

  // Force re-render every second to update countdown timer
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flip-card-front">
      <div
        className="rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden bg-cover bg-center bg-no-repeat h-full"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 via-slate-900/80 to-black/80 rounded-xl"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white/8 rounded-full -translate-y-2 sm:-translate-y-3 md:-translate-y-4 lg:-translate-y-4 xl:-translate-y-4 2xl:-translate-y-5 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-4 xl:translate-x-4 2xl:translate-x-5"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 bg-white/5 rounded-full translate-y-1 sm:translate-y-1.5 md:translate-y-2 lg:translate-y-2 xl:translate-y-2 2xl:translate-y-4 -translate-x-1 sm:-translate-x-1.5 md:-translate-x-2 lg:-translate-x-2 xl:-translate-x-2 2xl:-translate-x-4"></div>

        {/* Content Container */}
        <div className="flex flex-col h-full justify-between relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start flex-shrink-0">
            <div className="min-w-0 flex-1 mr-2 sm:mr-3 md:mr-4">
              <h1 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-quicksand drop-shadow-lg mb-1 sm:mb-1.5 md:mb-2">
                Adhān
              </h1>
              <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-white/90 drop-shadow-md flex-shrink-0" />
                <p className="text-white/90 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat drop-shadow-md">
                  {getLocationString(location)}
                </p>
              </div>
            </div>
            <Tooltip content="Change location" position="left">
              <button
                onClick={onFlip}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 fill-white/20 drop-shadow-md text-white/70 hover:text-white" />
              </button>
            </Tooltip>
          </div>

          {/* Middle Section - Countdown Timer */}
          <div className="text-center flex-1 flex flex-col justify-center px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 min-h-0">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-tight mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 font-quicksand drop-shadow-xl break-words">
              {countdown}
            </div>
            <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium font-montserrat drop-shadow-lg break-words mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
              Until {nextPrayer?.name} ({nextPrayer?.arabic})
            </p>
            <p className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl italic font-light font-montserrat drop-shadow-md break-words">
              "Indeed, performing prayers is a duty on the believers at the
              appointed times." An-Nisa (4:103)
            </p>
          </div>

          {/* Footer - Prayer Times Grid */}
          <div className="text-center flex-shrink-0 mt-2 sm:mt-3 md:mt-4">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8">
              {prayerTimes.map((prayer) => {
                const IconComponent = prayer.icon;
                return (
                  <div key={prayer.name} className="text-center">
                    <div
                      className={`flex flex-col items-center justify-end transition-all duration-300 ${
                        prayer.next
                          ? "scale-105 sm:scale-110 text-white"
                          : "text-off-white/70"
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-3 2xl:mb-4 transition-all duration-300">
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 drop-shadow-md" />
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-medium font-montserrat mb-0.5 sm:mb-1 drop-shadow-md break-words">
                        {prayer.name}
                      </p>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-light font-montserrat drop-shadow-sm break-words">
                        {prayer.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prayer indicators */}
            <div className="flex justify-center">
              <div className="flex space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2 xl:space-x-2 2xl:space-x-3">
                {prayerTimes.map((prayer, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 rounded-full transition-all duration-300 drop-shadow-sm flex-shrink-0 ${
                      prayer.next ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
