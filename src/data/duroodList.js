/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2024 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
export const duroodList = [
  {
    id: 1,
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    transliteration: "Allahumma salli ala Muhammad",
    meaning: "O Allah, send blessings upon Muhammad",
    category: "Simple",
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli ala Muhammad wa ala ali Muhammad",
    meaning:
      "O Allah, send blessings upon Muhammad and upon the family of Muhammad",
    category: "Extended",
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    transliteration: "Allahumma salli wa sallim ala nabiyyina Muhammad",
    meaning: "O Allah, send blessings and peace upon our Prophet Muhammad",
    category: "Extended",
  },
  {
    id: 4,
    arabic:
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ",
    transliteration: "Allahumma salli ala Muhammad kama sallayta ala Ibrahim",
    meaning:
      "O Allah, send blessings upon Muhammad as You sent blessings upon Ibrahim",
    category: "Ibrahim",
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    transliteration: "Allahumma barik ala Muhammad wa ala ali Muhammad",
    meaning: "O Allah, bless Muhammad and the family of Muhammad",
    category: "Blessing",
  },
];

// Helper functions
export const getDuroodById = (id) => {
  return duroodList.find((durood) => durood.id === id);
};

export const getDuroodsByCategory = (category) => {
  return duroodList.filter((durood) => durood.category === category);
};

export const getRandomDurood = () => {
  const randomIndex = Math.floor(Math.random() * duroodList.length);
  return duroodList[randomIndex];
};

export const getDuroodCount = () => {
  return duroodList.length;
};

export const getCategories = () => {
  return [...new Set(duroodList.map((durood) => durood.category))];
};

export default duroodList;
