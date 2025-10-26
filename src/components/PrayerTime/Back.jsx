/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { X, Navigation, Search, MapPin } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import Tooltip from "../Tooltip";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useGeolocation } from "../../hooks/useGeolocation";

const Back = ({ onFlip, onLocationUpdate }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Use geolocation hook
  const {
    error: geoError,
    getCurrentLocation,
    setManualLocation,
  } = useGeolocation();

  // Use the location search hook
  const {
    searchQuery,
    suggestions,
    isSearching,
    error: searchError,
    shouldShowSuggestions,
    setSearchQuery,
    formatLocation,
    formatSuggestionText,
    reset: resetSearch,
  } = useLocationSearch();

  // Close suggestions when clicking outside
  useClickOutside([searchRef, suggestionsRef], () => {
    setShowSuggestions(false);
  });

  // Show suggestions when there are results
  const displaySuggestions = showSuggestions && shouldShowSuggestions;

  // Handle using current geolocation
  const handleUseCurrentLocation = useCallback(async () => {
    setIsDetectingLocation(true);

    try {
      // Force refresh to get latest location
      const location = await getCurrentLocation();

      // Wait a moment for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update location if successful
      if (location) {
        onLocationUpdate(location);
      }
    } catch (error) {
      console.error("Failed to get current location:", error);
    } finally {
      setIsDetectingLocation(false);
    }
  }, [getCurrentLocation, onLocationUpdate]);

  // Handle selecting a location from search results
  const handleSelectLocation = useCallback(
    (location) => {
      const formattedLocation = formatLocation(location);

      // Update the search query to show what was selected
      setSearchQuery(`${formattedLocation.city}, ${formattedLocation.country}`);
      setShowSuggestions(false);
      setSelectedIndex(-1);

      // Save to cache via setManualLocation
      setManualLocation(formattedLocation);

      // Update location in parent component
      onLocationUpdate(formattedLocation);
    },
    [formatLocation, setSearchQuery, setManualLocation, onLocationUpdate]
  );

  // Handle search input changes
  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    },
    [setSearchQuery]
  );

  // Handle closing the settings panel
  const handleClose = useCallback(() => {
    setShowSuggestions(false);
    setSelectedIndex(-1);
    resetSearch();
    onFlip();
  }, [resetSearch, onFlip]);

  // Combine errors from geolocation and search
  const displayError = geoError || searchError;

  return (
    <div className="flip-card-back">
      <div className="rounded-xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-slate-600/30 to-slate-700/20 hover:scale-101 transition-all duration-300 ease-out border border-white/10 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 relative overflow-hidden h-full">
        {/* Decorative elements - OpenTaqwā colors */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-plum/10 rounded-full translate-y-12 -translate-x-12 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-forest/5 rounded-full pointer-events-none"></div>

        {/* Content */}
        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold font-quicksand mb-1 sm:mb-2">
                Location Set up
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base font-montserrat">
                Set your location for accurate prayer times
              </p>
            </div>
            <Tooltip content="Back to prayer times" position="left">
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" />
              </button>
            </Tooltip>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-xs sm:text-sm font-montserrat text-center">
                {displayError}
              </p>
            </div>
          )}

          {/* Two Column Form */}
          <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - Current Location */}
            <div className="flex flex-col justify-center">
              <button
                onClick={handleUseCurrentLocation}
                disabled={isDetectingLocation}
                className={`w-full bg-gold/20 hover:bg-gold/30 border border-gold/30 text-white rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 flex flex-col items-center justify-center space-y-3 sm:space-y-4 group h-full ${
                  isDetectingLocation ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDetectingLocation ? (
                  <>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-gold-light border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base md:text-lg font-semibold font-quicksand">
                      Detecting Location...
                    </span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gold-light group-hover:text-gold transition-colors" />
                    <div className="text-center">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold font-quicksand block">
                        Use Current Location
                      </span>
                      <span className="text-xs sm:text-sm text-white/70 font-montserrat block mt-2">
                        Auto-detect your location
                      </span>
                    </div>
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Search Input */}
            <div className="flex flex-col justify-start space-y-3 sm:space-y-4">
              {/* Header for search section */}
              <div className="text-center mb-2">
                <p className="text-white/70 text-xs sm:text-sm font-montserrat">
                  Or search for a location
                </p>
              </div>

              {/* Search Input with Autocomplete */}
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search city or country..."
                    className="w-full bg-white/20 border border-white/20 rounded-lg py-2 sm:py-2.5 md:py-3 pl-10 pr-3 sm:pr-4 text-white placeholder-white/50 focus:outline-none focus:border-gold-light focus:bg-white/40 transition-all duration-200 font-montserrat text-xs sm:text-sm md:text-base"
                    autoComplete="off"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {displaySuggestions && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.place_id}
                        onClick={() => handleSelectLocation(suggestion)}
                        className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 ${
                          index === selectedIndex ? "bg-white/10" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gold-light mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-xs sm:text-sm font-medium font-montserrat truncate">
                              {formatSuggestionText(suggestion)}
                            </p>
                            <p className="text-white/50 text-xs font-montserrat truncate mt-0.5">
                              {suggestion.display_name}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {showSuggestions &&
                  !isSearching &&
                  searchQuery.length >= 2 &&
                  suggestions.length === 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl p-4">
                      <p className="text-white/70 text-xs sm:text-sm text-center font-montserrat">
                        No locations found. Try a different search term.
                      </p>
                    </div>
                  )}
              </div>

              {/* Helper text */}
              <div className="text-center">
                <p className="text-white/50 text-xs font-montserrat italic">
                  Type at least 2 characters to search
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-4">
            <p className="text-white/60 text-xs text-center font-montserrat">
              Prayer times will be updated based on your new location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Back;
