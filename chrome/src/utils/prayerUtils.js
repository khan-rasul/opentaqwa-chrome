/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { Sunrise, Sun, CloudSun, Sunset, Moon } from "lucide-react";

export const getPrayerIcon = (prayerName) => {
  const iconMap = {
    Fajr: Sunrise,
    Dhuhr: Sun,
    Asr: CloudSun,
    Maghrib: Sunset,
    Isha: Moon,
  };
  return iconMap[prayerName] || Sun;
};

export const getArabicName = (prayerName) => {
  const arabicMap = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };
  return arabicMap[prayerName] || "";
};

export const formatTime12Hour = (time24) => {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes}${ampm}`;
};

export const getNextPrayer = (prayerTimings) => {
  if (!prayerTimings) return null;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const prayer of prayers) {
    const [hours, minutes] = prayerTimings[prayer].split(":");
    const prayerTime = parseInt(hours) * 60 + parseInt(minutes);

    if (prayerTime > currentTime) {
      return {
        name: prayer,
        time: prayerTimings[prayer],
        arabic: getArabicName(prayer),
        icon: getPrayerIcon(prayer),
      };
    }
  }

  // If no prayer is left today, return Fajr for tomorrow
  return {
    name: "Fajr",
    time: prayerTimings.Fajr,
    arabic: getArabicName("Fajr"),
    icon: getPrayerIcon("Fajr"),
  };
};

export const getTimeUntilNextPrayer = (nextPrayerTime) => {
  if (!nextPrayerTime) return "00:00:00";

  const now = new Date();
  const [hours, minutes] = nextPrayerTime.split(":");

  let nextPrayer = new Date();
  nextPrayer.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  // If the prayer time has passed today, set it for tomorrow
  if (nextPrayer <= now) {
    nextPrayer.setDate(nextPrayer.getDate() + 1);
  }

  const timeDiff = nextPrayer - now;
  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft
    .toString()
    .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
};

export const formatPrayerTimesForDisplay = (prayerTimings) => {
  if (!prayerTimings) return [];

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const nextPrayer = getNextPrayer(prayerTimings);

  return prayers.map((prayer) => ({
    name: prayer,
    time: prayerTimings[prayer],
    arabic: getArabicName(prayer),
    next: nextPrayer?.name === prayer,
    icon: getPrayerIcon(prayer),
  }));
};
