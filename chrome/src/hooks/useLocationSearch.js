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
import { geocodingApi } from "@opentaqwa/shared";
import { useDebounce } from "./useDebounce";

export const useLocationSearch = (minQueryLength = 2, debounceDelay = 300) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

  // Search effect - triggered by debounced value
  useEffect(() => {
    const searchLocations = async () => {
      // Reset if query is too short
      if (debouncedSearchQuery.length < minQueryLength) {
        setSuggestions([]);
        setError("");
        return;
      }

      setIsSearching(true);
      setError("");

      try {
        const results = await geocodingApi.searchLocations(
          debouncedSearchQuery
        );
        setSuggestions(results);
      } catch (err) {
        setError("Search failed. Please try again.");
        setSuggestions([]);
        console.error("Location search error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    searchLocations();
  }, [debouncedSearchQuery, minQueryLength]);

  // Format location for display
  const formatLocation = useCallback((location) => {
    return geocodingApi.formatLocation(location);
  }, []);

  // Format suggestion text for display
  const formatSuggestionText = useCallback((location) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village ||
      location.name;
    const country = location.address?.country || "";
    const state = location.address?.state || "";

    return state ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSuggestions([]);
    setError("");
  }, []);

  // Reset all state
  const reset = useCallback(() => {
    setSearchQuery("");
    setSuggestions([]);
    setError("");
    setIsSearching(false);
  }, []);

  return {
    // State
    searchQuery,
    suggestions,
    isSearching,
    error,
    hasSuggestions: suggestions.length > 0,
    shouldShowSuggestions:
      suggestions.length > 0 && searchQuery.length >= minQueryLength,

    // Methods
    setSearchQuery,
    formatLocation,
    formatSuggestionText,
    clearSearch,
    reset,
  };
};
