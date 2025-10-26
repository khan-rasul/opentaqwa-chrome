/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState, useEffect } from "react";
import Back from "./Back";
import { useLocation } from "../../contexts/LocationContext";
import Front from "./Front";
import { usePrayerTimes } from "../../hooks/usePrayerTimes";

const PrayerTime = () => {
  const { location, updateLocation } = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);
  const { loading: prayerLoading } = usePrayerTimes(location);

  useEffect(() => {
    if (!location) {
      setIsFlipped(true);
    }
  }, [location]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLocationUpdate = (location) => {
    updateLocation(location);
    setIsFlipped(false);
  };

  // Loading state
  if (prayerLoading) {
    return (
      <div className="w-full">
        <div className="rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-out p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden bg-cover bg-center bg-no-repeat h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[42rem] bg-gradient-to-r from-slate-800/60 via-slate-900/80 to-black/80">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-xl font-bold">
              Loading prayer times...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full perspective-container">
      <div
        className={`flip-card-inner h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[42rem] ${
          isFlipped ? "flipped" : ""
        }`}
      >
        <Front onFlip={handleFlip} />
        <Back onFlip={handleFlip} onLocationUpdate={handleLocationUpdate} />
      </div>
    </div>
  );
};

export default PrayerTime;
