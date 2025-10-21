/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useState, useEffect, useCallback } from "react";

export const useNotifications = () => {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported(typeof Notification !== "undefined");
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      return { granted: false, error: "Notifications not supported" };
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return { granted: result === "granted", permission: result };
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return { granted: false, error: error.message };
    }
  }, [isSupported]);

  // Send a notification
  const sendNotification = useCallback(
    (title, options = {}) => {
      if (!isSupported) {
        console.warn("Notifications not supported");
        return null;
      }

      if (permission !== "granted") {
        console.warn("Notification permission not granted");
        return null;
      }

      try {
        const notification = new Notification(title, {
          icon: "icon.png",
          badge: "icon.png",
          vibrate: [200, 100, 200],
          tag: "opentaqwa-prayer", // Replaces previous notifications
          requireInteraction: true,
          ...options,
        });
        return notification;
      } catch (error) {
        console.error("Error sending notification:", error);
        return null;
      }
    },
    [isSupported, permission]
  );

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
  };
};
