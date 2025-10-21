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
import { asmaUlHusnaApi } from "../services/asmaUlHusnaApi";

export const useDailyName = () => {
  const [dailyName, setDailyName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyName = async () => {
      try {
        setLoading(true);
        setError(null);

        const name = await asmaUlHusnaApi.getDailyName();
        setDailyName(name);
      } catch (err) {
        setError(err.message);

        // Fallback name
        setDailyName({
          number: 55,
          english: "Al Waliyy",
          arabic: "الْوَلِيُّ",
          meaning: "The Protector",
          description:
            'Is the One who preserves the believing servants, so the prophets and those who follow them are those who are the "preserved people" in the sense that they have been guided to the obligatory thanks to Him who makes them exist, that is, that is to say with regard to Allah',
          summary:
            "The name Al Waliyy reflects Allah's protective nature and His intimate relationship with His believers. Originating from Arabic, it highlights the concept of divine guardianship, where Allah assists, nurtures, and supports those who seek His help, ensuring their well-being in both spiritual and worldly matters.",
          location: ["4:45", "", "7:196", "", "42:28", "", "45:19"],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDailyName();
  }, []);

  return { dailyName, loading, error };
};
