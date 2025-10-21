/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useEffect, useRef } from "react";
import Dhikr from "./components/Dhikr";
import Dua from "./components/Dua";
import Durood from "./components/Durood";
import Header from "./components/Header";
import PrayerTime from "./components/PrayerTime";
import Tagline from "./components/Tagline";
import Verse from "./components/Verse";
import { useGeolocation } from "./hooks/useGeolocation";
import { usePrayerTimes } from "./hooks/usePrayerTimes";
import AsmaUlHusna from "./components/AsmaUlHusna";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LocationProvider, useLocation } from "./contexts/LocationContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { usePrayerNotifications } from "./hooks/usePrayerNotifications";
import Footer from "./components/Footer";

const AppContent = () => {
  const { location, updateLocation } = useLocation();
  const initializationRef = useRef(false);
  const { getCurrentLocation } = useGeolocation();
  const {
    prayerTimes,
    loading: prayerLoading,
    error,
  } = usePrayerTimes(location);

  useEffect(() => {
    // Prevent multiple initializations
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializeLocation = async () => {
      // If we already have cached location, just try to refresh in background
      if (location) {
        console.log(
          "Already have cached location, refreshing in background..."
        );

        try {
          const freshLocation = await getCurrentLocation();
          console.log("Got fresh location update:", freshLocation);
          updateLocation(freshLocation);
        } catch (error) {
          console.log(
            "Background refresh failed, keeping cached location:",
            error
          );
        }
        return;
      }

      // If no cached location, get fresh location
      console.log("No cached location, getting fresh location...");

      try {
        const freshLocation = await getCurrentLocation();
        console.log("Successfully got fresh location:", freshLocation);
        updateLocation(freshLocation);
      } catch (locationError) {
        console.log(
          "Fresh location failed, using Makkah as fallback:",
          locationError
        );
        const fallbackLocation = {
          city: "Makkah",
          country: "Saudi Arabia",
        };
        updateLocation(fallbackLocation);
      }
    };

    initializeLocation();
  }, []); // Empty dependency array

  // Prepare prayer data for components
  const prayerData = {
    timings: prayerTimes?.data?.timings || null,
    date: prayerTimes?.data?.date || null,
    location: location,
    loading: prayerLoading,
    error: error,
  };

  usePrayerNotifications(prayerData.timings);

  return (
    <div className="px-3 py-3 h-screen w-full max-w-full text-white min-w-fit bg-gradient-to-br from-amber-400/8 from-5% via-neutral-800 via-25% to-neutral-800 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col space-y-3">
        <Header prayerData={prayerData} />
        <div className="flex space-x-3 justify-center w-full h-52 sm:h-60 md:h-68 lg:h-76 xl:h-84 2xl:h-[26rem]">
          <div className="flex-8">
            <Dhikr />
          </div>
          <div className="flex-10">
            <Durood />
          </div>
        </div>
        <div className="flex space-x-3 justify-center w-full h-52 sm:h-60 md:h-68 lg:h-76 xl:h-84 2xl:h-[26rem]">
          <div className="flex-2">
            <Dua />
          </div>
          <div className="flex-1">
            <Tagline />
          </div>
        </div>
        <PrayerTime prayerData={prayerData} />
        <Verse />
        <AsmaUlHusna />
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <NotificationProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </NotificationProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

export default App;
