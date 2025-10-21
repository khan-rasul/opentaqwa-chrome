/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState, useEffect } from "react";
import { aladhanApi } from "../services/aladhanApi";

export const usePrayerTimes = (location, method = 3) => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrayerTimes = async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (location.latitude && location.longitude) {
        data = await aladhanApi.getPrayerTimesByCoordinates(
          location.latitude,
          location.longitude,
          method
        );
      } else if (location.city && location.country) {
        data = await aladhanApi.getPrayerTimesByCity(
          location.city,
          location.country,
          method
        );
      }

      setPrayerTimes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, [location, method]);

  return {
    prayerTimes,
    loading,
    error,
    refetch: fetchPrayerTimes,
  };
};
