/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

export const shareContent = async (title, content, textFormatter) => {
  if (!content) return;

  const formattedText = textFormatter(content);

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: formattedText,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard?.writeText(formattedText);
    }
  } else {
    // Fallback to clipboard
    navigator.clipboard?.writeText(formattedText);
  }
};

// Text formatters for different content types
export const formatters = {
  verse: (verse) =>
    `${verse.arabic}\n\n"${verse.english}"\n\n- ${verse.reference}`,
  asmaUlHusna: (name) =>
    `${name.arabic} - ${name.english}\n\n"${name.meaning}"\n\n${name.summary}`,
};
