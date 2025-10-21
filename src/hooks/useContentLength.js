/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import { useMemo } from "react";

export const useContentLength = (content, lengthCalculator) => {
  return useMemo(() => {
    if (!content) return "short";

    const totalLength = lengthCalculator(content);

    if (totalLength > 500) return "very-long";
    if (totalLength > 300) return "long";
    if (totalLength > 150) return "medium";
    return "short";
  }, [content, lengthCalculator]);
};
