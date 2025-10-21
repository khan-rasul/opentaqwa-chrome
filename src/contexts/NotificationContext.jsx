/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const useNotificationSettings = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationSettings must be used within NotificationProvider"
    );
  }
  return context;
};

const DEFAULT_SETTINGS = {
  enabled: false,
  notifyBefore: true, // Notify 10 minutes before
  notifyAtTime: true, // Notify at exact prayer time
  minutesBefore: 10,
  playAdhan: false,
  prayers: {
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
};

export const NotificationProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem("opentaqwa_notification_settings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(
      "opentaqwa_notification_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const togglePrayer = (prayerName) => {
    setSettings((prev) => ({
      ...prev,
      prayers: {
        ...prev.prayers,
        [prayerName]: !prev.prayers[prayerName],
      },
    }));
  };

  return (
    <NotificationContext.Provider
      value={{ settings, updateSettings, togglePrayer }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
