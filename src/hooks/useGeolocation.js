/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState, useCallback } from "react";
import { geocodingApi } from "../services/geocodingApi";

const ONE_HOUR = 60 * 60 * 1000;
const GPS_TIMEOUT = 7000;
const GEOCODING_TIMEOUT = 4000;
const FALLBACK_LOCATION = { city: "Makkah", country: "Saudi Arabia" };

// Helper: Get cached location
const getCachedLocation = () => {
  try {
    const cached = localStorage.getItem("lastKnownLocation");
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

// Helper: Check if cache is fresh (less than 1 hour old)
const isCacheFresh = () => {
  try {
    const timestamp = localStorage.getItem("lastKnownLocationTimestamp");
    return timestamp && Date.now() - parseInt(timestamp) < ONE_HOUR;
  } catch {
    return false;
  }
};

// Helper: Save location to cache
const saveToCache = (location) => {
  try {
    localStorage.setItem("lastKnownLocation", JSON.stringify(location));
    localStorage.setItem("lastKnownLocationTimestamp", Date.now().toString());
  } catch (error) {
    console.error("Failed to cache location:", error);
  }
};

// Helper: Get coordinates from GPS
const getGPSCoordinates = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
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
        timeout: options.timeout || GPS_TIMEOUT,
        enableHighAccuracy: options.forceRefresh || false,
        maximumAge: options.forceRefresh ? 0 : 300000, // 5 min or fresh
      }
    );
  });
};

// Helper: Reverse geocode with timeout
const geocodeWithTimeout = async (latitude, longitude) => {
  return Promise.race([
    geocodingApi.reverseGeocode(latitude, longitude),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Geocoding timeout")),
        GEOCODING_TIMEOUT
      )
    ),
  ]);
};

// Helper: Fetch fresh location from GPS
const fetchFreshLocation = async (forceRefresh = false) => {
  const coords = await getGPSCoordinates({ forceRefresh });
  console.log("Got GPS coordinates:", coords);

  try {
    const { city, country } = await geocodeWithTimeout(
      coords.latitude,
      coords.longitude
    );
    return { ...coords, city, country };
  } catch {
    console.warn("Geocoding failed, using generic names");
    return { ...coords, city: "Current Location", country: "GPS Location" };
  }
};

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Main function: Get location (with cache support)
  const getCurrentLocation = useCallback(async (useCache = true) => {
    setLoading(true);
    setError(null);

    try {
      // Try fresh cache first if allowed
      if (useCache && isCacheFresh()) {
        const cached = getCachedLocation();
        if (cached) {
          console.log("Using recent cached location");
          setLocation(cached);
          setLoading(false);
          return cached;
        }
      }

      // Fetch fresh location with timeout fallback
      const freshLocation = await Promise.race([
        fetchFreshLocation(false),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("GPS timeout")), GPS_TIMEOUT + 1000)
        ),
      ]);

      console.log("Got fresh location:", freshLocation);
      saveToCache(freshLocation);
      setLocation(freshLocation);
      setLoading(false);
      return freshLocation;
    } catch (err) {
      console.warn("Fresh location failed:", err.message);

      // Fallback 1: Any cached location
      const cached = getCachedLocation();
      if (cached) {
        console.log("Using old cached location as fallback");
        setLocation(cached);
        setLoading(false);
        return cached;
      }

      // Fallback 2: Default location
      console.log("Using default fallback location");
      saveToCache(FALLBACK_LOCATION);
      setLocation(FALLBACK_LOCATION);
      setLoading(false);
      return FALLBACK_LOCATION;
    }
  }, []);

  // Force refresh: Always fetch fresh, bypass cache
  const forceRefreshLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Force refreshing location (ignoring cache)...");
      const freshLocation = await fetchFreshLocation(true);

      console.log("Force refresh successful:", freshLocation);
      saveToCache(freshLocation);
      setLocation(freshLocation);
      setLoading(false);
      return freshLocation;
    } catch (err) {
      const errorMsg = err.message || "Failed to get location";
      console.error("Force refresh failed:", errorMsg);
      setError(errorMsg);
      setLoading(false);
      throw err;
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem("lastKnownLocation");
      localStorage.removeItem("lastKnownLocationTimestamp");
      console.log("Location cache cleared");
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    forceRefreshLocation,
    clearCache,
  };
};
