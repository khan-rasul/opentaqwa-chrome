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

const BASE_URL = "https://api.aladhan.com/v1";

export const aladhanApi = {
  getPrayerTimesByCoordinates: async (latitude, longitude, method = 3) => {
    try {
      const response = await axios.get(`${BASE_URL}/timings`, {
        params: {
          latitude,
          longitude,
          method,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch prayer times");
    }
  },

  getPrayerTimesByCity: async (city, country, method = 3) => {
    try {
      const response = await axios.get(`${BASE_URL}/timingsByCity`, {
        params: {
          city,
          country,
          method,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch prayer times");
    }
  },
};
