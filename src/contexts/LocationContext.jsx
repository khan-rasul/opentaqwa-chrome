/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { createContext, useContext, useState, useEffect } from "react";

const CACHE_KEY = "opentaqwa:chrome:lastKnownLocation";

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    // Load cached location on mount
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error("Failed to parse cached location:", error);
    }
    return null;
  });

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(location));
    }
  }, [location]);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const value = {
    location,
    updateLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
