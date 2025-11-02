/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import {
  Languages,
  User,
  MapPin,
  Clock,
  LogOut,
  UserCircle,
  Bell,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getNextPrayer, formatTime12Hour } from "../utils/prayerUtils";
import { getLocationString } from "../utils/locationUtils";
import LanguageSelector from "./LanguageSelector";
import AuthModal from "./AuthModal";
import Tooltip from "./Tooltip";
import { useAuth } from "../contexts/AuthContext";
import NotificationSettings from "./NotificationSettings";
import { useNotificationSettings } from "../contexts/NotificationContext";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useLocation } from "../contexts/LocationContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { getUserInitials } from "../utils/userUtil";

const Header = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { settings } = useNotificationSettings();
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);

  const { location } = useLocation();
  const { prayerTimes, loading } = usePrayerTimes(location);
  const nextPrayer = getNextPrayer(prayerTimes?.data?.timings || null);
  const nextPrayerDisplay = nextPrayer
    ? `${nextPrayer.name} - ${formatTime12Hour(nextPrayer.time)}`
    : loading
    ? "Loading..."
    : "Configure Location";

  // Close user menu when clicking outside
  const userMenuRef = useRef(null);
  useClickOutside([userMenuRef], () => setShowUserMenu(false));

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-slate-600/30 to-slate-700/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 relative">
        <div className="flex justify-between items-center relative z-20">
          {/* Current Prayer Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 flex items-center justify-center">
              <img
                src="icon.png"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14"
              />
            </div>

            <div className="flex flex-col">
              <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-quicksand drop-shadow-md">
                {nextPrayerDisplay}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-white/70" />
                <div className="text-white/80 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-light font-montserrat drop-shadow-sm">
                  {getLocationString(location)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 lg:space-x-4">
            {/* Notification Button */}
            <Tooltip content="Prayer notifications" position="left">
              <button
                onClick={() => setShowNotificationSettings(true)}
                className={`bg-white/15 backdrop-blur-md rounded-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 2xl:p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer relative ${
                  settings.enabled ? "ring-2 ring-gold/50" : ""
                }`}
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white/90 drop-shadow-md" />
                {settings.enabled && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gold rounded-full"></div>
                )}
              </button>
            </Tooltip>

            {/* Language Button */}
            <Tooltip content="Change language" position="left">
              <button
                onClick={() => setShowLanguageSelector(true)}
                className="bg-white/15 backdrop-blur-md rounded-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 2xl:p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Languages className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white/90 drop-shadow-md" />
              </button>
            </Tooltip>

            {/* User Button with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <Tooltip
                content={isAuthenticated ? user?.name : "Sign In / Sign Up"}
                position="left"
              >
                <button
                  onClick={handleAvatarClick}
                  className={`bg-white/15 backdrop-blur-md rounded-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 2xl:p-5 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer ${
                    isAuthenticated
                      ? "bg-gradient-to-br from-gold-light to-gold-light/20"
                      : ""
                  }`}
                >
                  {isAuthenticated ? (
                    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center text-white font-bold font-quicksand text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
                      {getUserInitials(user)}
                    </div>
                  ) : (
                    <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-white/90 drop-shadow-md" />
                  )}
                </button>
              </Tooltip>

              {/* User Dropdown Menu */}
              {isAuthenticated && showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gradient-to-r from-slate-600/30 to-slate-700/20 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gold-light to-gold-light/20 rounded-full flex items-center justify-center text-white font-bold font-quicksand text-sm">
                        {getUserInitials(user)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold font-quicksand text-sm truncate">
                          {user?.name}
                        </p>
                        <p className="text-white/60 text-xs font-montserrat truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // TODO: Add profile page
                        console.log("Profile clicked");
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-montserrat text-sm"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 font-montserrat text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-white/5 border-t border-white/10">
                    <p className="text-white/50 text-xs font-montserrat text-center">
                      Member since{" "}
                      {new Date(user?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Responsive decorative line */}
        <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 md:left-5 md:right-5 lg:left-6 lg:right-6 xl:left-7 xl:right-7 2xl:left-8 2xl:right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Notification Settings Modal */}
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />

      {/* Language Selector Modal */}
      <LanguageSelector
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;
