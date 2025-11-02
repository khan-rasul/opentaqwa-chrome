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
import { quranApi } from "@opentaqwa/shared";

export const useDailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get today's date string for caching
  const getTodayString = () => {
    return new Date().toDateString();
  };

  // Check if we have today's verse cached
  const getTodaysVerseFromCache = () => {
    try {
      const cachedDate = localStorage.getItem("dailyVerseDate");
      const cachedVerse = localStorage.getItem("dailyVerse");

      if (cachedDate === getTodayString() && cachedVerse) {
        return JSON.parse(cachedVerse);
      }
    } catch (error) {
      console.error("Failed to get cached verse:", error);
    }
    return null;
  };

  // Save today's verse to cache
  const saveTodaysVerseToCache = (verseData) => {
    try {
      localStorage.setItem("dailyVerseDate", getTodayString());
      localStorage.setItem("dailyVerse", JSON.stringify(verseData));
    } catch (error) {
      console.error("Failed to cache verse:", error);
    }
  };

  const fetchDailyVerse = async (useCache = true) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cachedVerse = getTodaysVerseFromCache();
      if (useCache && cachedVerse) {
        console.log("Using cached daily verse");
        setVerse(cachedVerse);
        setLoading(false);
        return;
      }

      console.log("Fetching new daily verse");

      // Use the API's random verse function
      const verseData = await quranApi.getRandomVerse();

      // Cache the verse
      saveTodaysVerseToCache(verseData);

      setVerse(verseData);
    } catch (err) {
      console.error("Failed to fetch daily verse:", err);
      setError(err.message);

      // Use fallback verse
      const fallbackVerse = {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        english: "And whoever fears Allah - He will make for him a way out",
        surahName: "At-Talaq",
        surahNameArabic: "الطلاق",
        verseNumber: 2,
        surahNumber: 65,
        reference: "At-Talaq (65:2)",
      };

      setVerse(fallbackVerse);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyVerse();
  }, []);

  return {
    verse,
    loading,
    error,
    refreshVerse: fetchDailyVerse,
  };
};
