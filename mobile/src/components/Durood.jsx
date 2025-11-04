import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Temporary mock data
const duroodList = [
  {
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammad",
    meaning: "O Allah, send blessings upon Muhammad",
  },
  {
    arabic: "صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
    transliteration: "Sallallahu 'alayhi wa sallam",
    meaning: "May Allah's peace and blessings be upon him",
  },
  {
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    transliteration: "Allahumma salli wa sallim 'ala nabiyyina Muhammad",
    meaning: "O Allah, send peace and blessings upon our Prophet Muhammad",
  },
];

export default function Durood() {
  const [duroodCount, setDuroodCount] = useState(0);
  const language = "en";
  const currentDurood = duroodList[duroodCount % duroodList.length];

  const getDisplayText = (durood) => {
    if (language === "ar") {
      return durood.arabic;
    }
    return durood.transliteration;
  };

  const displayText = getDisplayText(currentDurood);

  return (
    <Pressable
      onPress={() => setDuroodCount(duroodCount + 1)}
      className="flex-1 rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={["#263936", "#263936CC", "#26393633"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1, padding: 12 }}
      >
        {/* Content */}
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-base font-bold">Durūd</Text>

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
                  {duroodCount}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setDuroodCount(0)}
                style={{ padding: 6, borderRadius: 12 }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="refresh"
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
              "{currentDurood.meaning}"
            </Text>

            {/* Pagination dots */}
            <View className="flex-row gap-1.5">
              {duroodList.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      index === duroodCount % duroodList.length
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
