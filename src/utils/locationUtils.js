/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
export const getLocationString = (prayerData) => {
  if (prayerData.loading) return "Getting location...";
  if (prayerData.error) return "Location unavailable";

  if (prayerData.location) {
    if (prayerData.location.city && prayerData.location.country) {
      return `${prayerData.location.city}, ${prayerData.location.country}`;
    } else if (prayerData.location.latitude && prayerData.location.longitude) {
      return `${prayerData.location.latitude.toFixed(
        2
      )}, ${prayerData.location.longitude.toFixed(2)}`;
    }
  }

  return "Makkah, Saudi Arabia";
};
