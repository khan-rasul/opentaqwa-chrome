/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useEffect, useRef } from "react";
import { useNotifications } from "./useNotifications";
import { useNotificationSettings } from "../contexts/NotificationContext";

// Helper: Parse time string (e.g., "05:30") to minutes since midnight
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper: Get current time in minutes since midnight
const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Helper: Calculate milliseconds until target time
const msUntilTime = (targetMinutes) => {
  const currentMinutes = getCurrentMinutes();
  let minutesUntil = targetMinutes - currentMinutes;

  // If time has passed today, schedule for tomorrow
  if (minutesUntil <= 0) {
    minutesUntil += 24 * 60;
  }

  return minutesUntil * 60 * 1000;
};

export const usePrayerNotifications = (prayerTimes) => {
  const { sendNotification, permission } = useNotifications();
  const { settings } = useNotificationSettings();
  const timeoutsRef = useRef([]);

  useEffect(() => {
    // Clear existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Don't schedule if notifications are disabled or not permitted
    if (!settings.enabled || permission !== "granted" || !prayerTimes) {
      return;
    }

    // Schedule notifications for each prayer
    Object.entries(prayerTimes).forEach(([prayerName, timeString]) => {
      // Skip if this prayer is disabled or it's not a main prayer
      if (!settings.prayers[prayerName]) return;

      const prayerMinutes = timeToMinutes(timeString);

      // Schedule "before" notification
      if (settings.notifyBefore) {
        const beforeMinutes = prayerMinutes - settings.minutesBefore;
        const msUntilBefore = msUntilTime(beforeMinutes);

        const beforeTimeout = setTimeout(() => {
          sendNotification(
            `${prayerName} in ${settings.minutesBefore} minutes`,
            {
              body: `${prayerName} prayer will begin at ${timeString}`,
              tag: `${prayerName}-before`,
            }
          );
        }, msUntilBefore);

        timeoutsRef.current.push(beforeTimeout);
      }

      // Schedule "at time" notification
      if (settings.notifyAtTime) {
        const msUntilPrayer = msUntilTime(prayerMinutes);

        const atTimeTimeout = setTimeout(() => {
          sendNotification(`${prayerName} Prayer Time`, {
            body: `It's time for ${prayerName} prayer`,
            tag: `${prayerName}-time`,
            requireInteraction: true, // Stays until dismissed
          });

          // TODO: Play Adhan if enabled
          if (settings.playAdhan) {
            // Implement Adhan audio playback
            console.log("Play Adhan for", prayerName);
          }
        }, msUntilPrayer);

        timeoutsRef.current.push(atTimeTimeout);
      }
    });

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [prayerTimes, settings, permission, sendNotification]);
};
