/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
const DEFAULT_LOCATION = "Somewhere in Duniya";

const formatCityCountry = (city, country) => `${city}, ${country}`;

export const getLocationString = (location = null) => {
  if (!location) return DEFAULT_LOCATION;

  const { city, country } = location;

  if (city && country) {
    return formatCityCountry(city, country);
  }

  return DEFAULT_LOCATION;
};
