/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { X, Bell, BellOff, Clock } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import { useNotificationSettings } from "../contexts/NotificationContext";

const NotificationSettings = ({ isOpen, onClose }) => {
  const { permission, sendNotification } = useNotifications();
  const { settings, updateSettings, togglePrayer } = useNotificationSettings();

  if (!isOpen) return null;

  const handleEnableNotifications = () => {
    updateSettings({ enabled: true });
  };

  const handleDisableNotifications = () => {
    updateSettings({ enabled: false });
  };

  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 h-full backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-r from-slate-600/30 to-slate-700/20 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-plum/10 rounded-full translate-y-12 -translate-x-12 pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white/90" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <Bell className="w-12 h-12 text-gold mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white font-quicksand mb-2">
              Prayer Notifications
            </h2>
            <p className="text-white/70 font-montserrat text-sm">
              Get reminded when it's time to pray
            </p>
          </div>

          {/* Permission Status */}
          {permission === "denied" && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm font-montserrat text-center">
                Notifications are blocked. Please enable them in your browser
                settings.
              </p>
            </div>
          )}

          {/* Enable/Disable Toggle */}
          <div className="mb-6">
            {permission !== "granted" ? (
              <button
                onClick={handleEnableNotifications}
                className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-white font-semibold py-3 rounded-lg transition-all duration-300 font-quicksand shadow-lg flex items-center justify-center space-x-2"
              >
                <Bell className="w-5 h-5" />
                <span>Enable Notifications</span>
              </button>
            ) : settings.enabled ? (
              <button
                onClick={handleDisableNotifications}
                className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 font-semibold py-3 rounded-lg transition-all duration-300 font-quicksand flex items-center justify-center space-x-2"
              >
                <BellOff className="w-5 h-5" />
                <span>Disable Notifications</span>
              </button>
            ) : (
              <button
                onClick={() => updateSettings({ enabled: true })}
                className="w-full bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-white font-semibold py-3 rounded-lg transition-all duration-300 font-quicksand shadow-lg flex items-center justify-center space-x-2"
              >
                <Bell className="w-5 h-5" />
                <span>Enable Notifications</span>
              </button>
            )}
          </div>

          {/* Settings (only show if enabled) */}
          {settings.enabled && permission === "granted" && (
            <div className="space-y-4">
              {/* Notification Timing */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-light font-montserrat mb-3 text-sm">
                  Notification Settings
                </h3>

                {/* Notify Before */}
                <label className="flex items-center justify-between mb-3 cursor-pointer">
                  <span className="text-white/90 text-sm font-montserrat">
                    Notify before prayer
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifyBefore}
                    onChange={(e) =>
                      updateSettings({ notifyBefore: e.target.checked })
                    }
                    className="w-5 h-5 accent-gold cursor-pointer"
                  />
                </label>

                {/* Minutes Before */}
                {settings.notifyBefore && (
                  <div className="mb-3 ml-4">
                    <select
                      value={settings.minutesBefore}
                      onChange={(e) =>
                        updateSettings({
                          minutesBefore: Number(e.target.value),
                        })
                      }
                      className="w-full bg-forest/20 border border-forest/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-gold focus:bg-forest/30 transition-all duration-200 font-montserrat text-sm"
                    >
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                      <option value="30">30 minutes</option>
                    </select>
                  </div>
                )}

                {/* Notify At Time */}
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-white/90 text-sm font-montserrat">
                    Notify at prayer time
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifyAtTime}
                    onChange={(e) =>
                      updateSettings({ notifyAtTime: e.target.checked })
                    }
                    className="w-5 h-5 accent-gold cursor-pointer"
                  />
                </label>
              </div>

              {/* Prayer Selection */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-light font-montserrat mb-3 text-sm">
                  Notifications for
                </h3>
                <div className="space-y-2">
                  {prayers.map((prayer) => (
                    <label
                      key={prayer}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-white/90 text-sm font-montserrat">
                        {prayer}
                      </span>
                      <input
                        type="checkbox"
                        checked={settings.prayers[prayer]}
                        onChange={() => togglePrayer(prayer)}
                        className="w-5 h-5 accent-gold cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
