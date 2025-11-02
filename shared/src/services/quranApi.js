/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
import axios from "axios";

const QURAN_API_BASE = "https://api.alquran.cloud/v1";

export const quranApi = {
  // Get a random verse with both Arabic and English (al-Hilali & Khan translation)
  getRandomVerse: async () => {
    // Get a random surah (1-114) and random verse
    const randomSurah = Math.floor(Math.random() * 114) + 1;

    // Get surah info to know verse count
    const surahInfoResponse = await axios.get(
      `${QURAN_API_BASE}/surah/${randomSurah}`
    );
    const verseCount = surahInfoResponse.data.data.numberOfAyahs;

    // Get random verse from this surah
    const randomVerse = Math.floor(Math.random() * verseCount) + 1;

    return quranApi.getVerseByReference(randomSurah, randomVerse);
  },
  // Get verse by specific reference (using al-Hilali & Khan translation)
  getVerseByReference: async (surahNumber, verseNumber) => {
    const [arabicResponse, englishResponse] = await Promise.all([
      axios.get(`${QURAN_API_BASE}/ayah/${surahNumber}:${verseNumber}`),
      axios.get(
        `${QURAN_API_BASE}/ayah/${surahNumber}:${verseNumber}/en.hilali`
      ),
    ]);

    const arabicVerse = arabicResponse.data.data;
    const englishVerse = englishResponse.data.data;

    return {
      arabic: arabicVerse.text,
      english: englishVerse.text,
      surahName: arabicVerse.surah.englishName,
      surahNameArabic: arabicVerse.surah.name,
      verseNumber: arabicVerse.numberInSurah,
      surahNumber: arabicVerse.surah.number,
      reference: `${arabicVerse.surah.englishName} (${arabicVerse.surah.number}:${arabicVerse.numberInSurah})`,
    };
  },
};
