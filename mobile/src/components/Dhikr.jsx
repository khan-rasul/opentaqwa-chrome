import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Temporary mock data
const dhikrList = [
  {
    arabic: "سُبْحَانَ اللهِ",
    transliteration: "SubhanAllah",
    meaning: "Glory be to Allah",
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    meaning: "All praise is due to Allah",
  },
  {
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    meaning: "Allah is the Greatest",
  },
];

export default function Dhikr() {
  const [dhikrCount, setDhikrCount] = useState(0);
  const language = "en";
  const currentDhikr = dhikrList[dhikrCount % dhikrList.length];

  const getDisplayText = (dhikr) => {
    if (language === "ar") {
      return dhikr.arabic;
    }
    return dhikr.transliteration;
  };

  const displayText = getDisplayText(currentDhikr);

  return (
    <Pressable
      onPress={() => setDhikrCount(dhikrCount + 1)}
      className="flex-1 rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={["#625443", "#625443CC", "#62544333"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1, padding: 12 }}
      >
        {/* Content */}
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <Text className="text-white text-base font-bold">Dhikr</Text>

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
                  {dhikrCount}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setDhikrCount(0)}
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
              "{currentDhikr.meaning}"
            </Text>

            {/* Pagination dots */}
            <View className="flex-row gap-1.5">
              {dhikrList.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor:
                      index === dhikrCount % dhikrList.length
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
