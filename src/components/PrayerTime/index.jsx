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

const PrayerTime = () => {
  const { location, updateLocation } = useLocation();
  const [isFlipped, setIsFlipped] = useState(false);

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

  return (
    <div className="w-full perspective-container">
      <div
        className={`flip-card-inner h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[42rem] ${
          isFlipped ? "flipped" : ""
        }`}
      >
        <Front onFlip={handleFlip} className={`${isFlipped ? "hidden" : ""}`} />
        <Back onFlip={handleFlip} onLocationUpdate={handleLocationUpdate} />
      </div>
    </div>
  );
};

export default PrayerTime;
