/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import axios from "axios";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export const geocodingApi = {
  reverseGeocode: async (latitude, longitude) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await axios.get(`${NOMINATIM_BASE_URL}/reverse`, {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: 1,
        },
        headers: {
          "User-Agent": "Prayer-Times-App/1.0",
        },
        timeout: 5000,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.data || !response.data.address) {
        throw new Error("Invalid geocoding response");
      }

      const address = response.data.address;

      // Extract city and country from the response
      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        address.state ||
        "Unknown City";

      const country = address.country || "Unknown Country";

      return { city, country };
    } catch (error) {
      console.error("Reverse geocoding failed:", error);

      if (error.code === "ECONNABORTED" || error.name === "AbortError") {
        throw new Error("Location service timeout");
      }

      throw new Error("Failed to get location name");
    }
  },
};
