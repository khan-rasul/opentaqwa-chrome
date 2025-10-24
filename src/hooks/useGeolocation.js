/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 */
import { useState, useCallback } from "react";
import { geocodingApi } from "../services/geocodingApi";

const ONE_HOUR = 60 * 60 * 1000;
const GPS_TIMEOUT = 7000;
const GEOCODING_TIMEOUT = 4000;
const FALLBACK_LOCATION = { city: "Makkah", country: "Saudi Arabia" };

// Helper: Cache management
const getCachedLocation = () => {
  try {
    const cached = localStorage.getItem("lastKnownLocation");
    const timestamp = localStorage.getItem("lastKnownLocationTimestamp");
    const isFresh = timestamp && Date.now() - parseInt(timestamp) < ONE_HOUR;

    return cached && isFresh ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const saveToCache = (location) => {
  try {
    localStorage.setItem("lastKnownLocation", JSON.stringify(location));
    localStorage.setItem("lastKnownLocationTimestamp", Date.now().toString());
  } catch (error) {
    console.error("Failed to cache location:", error);
  }
};

// Helper: Get current location
const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      reject,
      {
        timeout: GPS_TIMEOUT,
        enableHighAccuracy: options.forceRefresh || false,
        maximumAge: options.forceRefresh ? 0 : 300000,
      }
    );
  });
};

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first unless force refresh
      if (!forceRefresh) {
        const cached = getCachedLocation();
        if (cached) {
          setLocation(cached);
          setLoading(false);
          return cached;
        }
      }

      // Get fresh coordinates
      const coords = await getCurrentPosition({ forceRefresh });

      // Get location name
      const locationData = await Promise.race([
        geocodingApi.reverseGeocode(coords.latitude, coords.longitude),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Geocoding timeout")),
            GEOCODING_TIMEOUT
          )
        ),
      ]);

      const freshLocation = {
        ...coords,
        city: locationData.city || "Unknown City",
        country: locationData.country || "Unknown Country",
      };

      saveToCache(freshLocation);
      setLocation(freshLocation);
      return freshLocation;
    } catch (err) {
      console.error("Location fetch failed:", err.message);

      // Try cached location as fallback
      const cached = getCachedLocation();
      if (cached) {
        setLocation(cached);
        return cached;
      }

      // Ultimate fallback
      setLocation(FALLBACK_LOCATION);
      setError("Could not get location");
      return FALLBACK_LOCATION;
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, error, getLocation };
};
