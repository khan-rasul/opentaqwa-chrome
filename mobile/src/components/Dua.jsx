import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Temporary mock data
const duaList = [
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
    transliteration: "Rabbana atina fid-dunya hasanah",
    meaning: "Our Lord, give us good in this world",
    category: "General",
  },
  {
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي",
    transliteration: "Rabbi ishrah li sadri",
    meaning: "My Lord, expand for me my breast",
    category: "Guidance",
  },
  {
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا",
    transliteration: "Rabbana la tuzigh qulubana",
    meaning: "Our Lord, let not our hearts deviate",
    category: "Protection",
  },
];

export default function Dua() {
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const language = "en";
  const currentDua = duaList[currentDuaIndex];

  const getDisplayText = (dua) => {
    if (language === "ar") {
      return dua.arabic;
    }
    return dua.transliteration;
  };

  const handleCardClick = () => {
    setCurrentDuaIndex((currentDuaIndex + 1) % duaList.length);
  };

  const displayText = getDisplayText(currentDua);

  return (
    <Pressable
      onPress={handleCardClick}
      className="flex-1 rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={["#5E4B56", "#5E4B56CC", "#5E4B5633"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1, padding: 12 }}
      >
        {/* Content */}
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-base font-bold">Du'ā</Text>

            <View className="flex-row items-center gap-1.5">
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text className="text-white text-sm font-medium">
                  {currentDuaIndex + 1}
                </Text>
              </View>

              <TouchableOpacity
                style={{ padding: 6, borderRadius: 12 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="heart-outline"
                  size={16}
                  color="rgba(255, 255, 255, 0.8)"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Text */}
          <View className="flex-1 justify-center items-center px-2">
            <Text
              className={`text-white text-center ${
                language === "ar"
                  ? "text-2xl font-light"
                  : "text-xl font-medium"
              }`}
            >
              {displayText}
            </Text>
          </View>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-white/60 text-xs italic text-center">
              "{currentDua.meaning}"
            </Text>

            {/* Pagination dots */}
            <View className="flex-row gap-1.5">
              {duaList.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      index === currentDuaIndex
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.3)",
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
