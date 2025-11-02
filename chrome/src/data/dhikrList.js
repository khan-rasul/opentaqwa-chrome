/*
 * OpenTaqwā - Islamic Companion Extension
 * Copyright (c) 2025 [Rasul Khan]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */
export const dhikrList = [
  {
    id: 1,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "Subhan'Allah",
    meaning: "Glory be to Allah",
    category: "Tasbih",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    meaning: "Praise be to Allah",
    category: "Tahmid",
  },
  {
    id: 3,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    meaning: "Allah is Greatest",
    category: "Takbir",
  },
  {
    id: 4,
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illa Allah",
    meaning: "There is no god but Allah",
    category: "Tahlil",
  },
  {
    id: 5,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allah wa bihamdihi",
    meaning: "Glory be to Allah and praise Him",
    category: "Tasbih",
  },
  {
    id: 6,
    arabic: "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "Subhan Allah al-Azeem",
    meaning: "Glory be to Allah, the Magnificent",
    category: "Tasbih",
  },
  {
    id: 7,
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    meaning: "There is no power except with Allah",
    category: "Hawqala",
  },
  {
    id: 8,
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    meaning: "I seek forgiveness from Allah",
    category: "Istighfar",
  },
  {
    id: 9,
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    meaning: "In the name of Allah",
    category: "Basmalah",
  },
];

// Helper functions
export const getDhikrById = (id) => {
  return dhikrList.find((dhikr) => dhikr.id === id);
};

export const getDhikrsByCategory = (category) => {
  return dhikrList.filter((dhikr) => dhikr.category === category);
};

export const getRandomDhikr = () => {
  const randomIndex = Math.floor(Math.random() * dhikrList.length);
  return dhikrList[randomIndex];
};

export const getDhikrCount = () => {
  return dhikrList.length;
};

export default dhikrList;
