/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState, useCallback, useEffect } from "react";
import { geocodingApi } from "../services/geocodingApi";
import { useLocation } from "../contexts/LocationContext";

const GPS_TIMEOUT = 7000;
const GEOCODING_TIMEOUT = 4000;
const FALLBACK_LOCATION = { city: "Makkah", country: "Saudi Arabia" };

// Helper: Get location with geocoding
const getLocationWithGeocoding = async (latitude, longitude) => {
  try {
    const locationNames = await Promise.race([
      geocodingApi.reverseGeocode(latitude, longitude),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Geocoding timeout")),
          GEOCODING_TIMEOUT
        )
      ),
    ]);

    return {
      latitude,
      longitude,
      city: locationNames.city,
      country: locationNames.country,
    };
  } catch (error) {
    console.warn("Geocoding failed, using coordinates with generic names");
    return {
      latitude,
      longitude,
      city: "Currently",
      country: "Duniya",
    };
  }
};

const requestLocationPermission = async () => {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    if (result.state === "denied") {
      throw new Error("Location permission was denied");
    }
    return result.state;
  } catch (error) {
    console.error("Permission request failed:", error);
    throw error;
  }
};

export const useGeolocation = () => {
  const { location, updateLocation: setLocation } = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      setError(null);

      // Check browser support
      if (!navigator.geolocation) {
        const error = "Geolocation is not supported by this browser.";
        setError(error);
        setLoading(false);
        reject(error);
        return;
      }

      // Fallback handler for timeout or GPS failure
      const useFallback = () => {
        console.log("Using Makkah as fallback");
        setLocation(FALLBACK_LOCATION);
        setLoading(false);
        resolve(FALLBACK_LOCATION);
      };

      // Set timeout for GPS request
      const timeoutId = setTimeout(() => {
        console.log("GPS timeout");
        useFallback();
      }, GPS_TIMEOUT + 1000);

      try {
        await requestLocationPermission();
      } catch (error) {
        useFallback();
        return;
      }

      // Get GPS location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timeoutId);

          const { latitude, longitude } = position.coords;

          try {
            const locationData = await getLocationWithGeocoding(
              latitude,
              longitude
            );
            console.log("Successfully got location");

            setLocation(locationData);
            setLoading(false);
            resolve(locationData);
          } catch (error) {
            console.error("Location processing failed:", error);
            useFallback();
          }
        },
        (gpsError) => {
          clearTimeout(timeoutId);
          console.error("GPS error:", gpsError.message);

          if (!useFallback()) {
            setError(gpsError.message);
            reject(gpsError.message);
          }
        },
        {
          timeout: GPS_TIMEOUT,
          enableHighAccuracy: false,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
};
