/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import { useEffect } from "react";

export const useClickOutside = (refs, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside all provided refs
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, handler]);
};
