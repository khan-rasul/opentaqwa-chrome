import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Mock data - replace with actual hooks later
const mockPrayerTimes = [
  {
    name: "Fajr",
    arabic: "الفجر",
    time: "5:30 AM",
    icon: "sunny-outline",
    next: false,
  },
  {
    name: "Dhuhr",
    arabic: "الظهر",
    time: "12:45 PM",
    icon: "partly-sunny-outline",
    next: false,
  },
  {
    name: "Asr",
    arabic: "العصر",
    time: "3:30 PM",
    icon: "cloudy-outline",
    next: true,
  },
  {
    name: "Maghrib",
    arabic: "المغرب",
    time: "6:15 PM",
    icon: "moon-outline",
    next: false,
  },
  {
    name: "Isha",
    arabic: "العشاء",
    time: "7:45 PM",
    icon: "moon",
    next: false,
  },
];

const BACKGROUND_IMAGE_URL =
  "https://images.pexels.com/photos/33759665/pexels-photo-33759665.jpeg";

export default function PrayerTime() {
  const [countdown, setCountdown] = useState("02:15:30");
  const [loading, setLoading] = useState(false);
  const location = { city: "New York", country: "USA" }; // Mock location
  const nextPrayer = mockPrayerTimes.find((prayer) => prayer.next);

  // Mock countdown update
  useEffect(() => {
    const timer = setInterval(() => {
      // Update countdown logic here
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: 320,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <View
          className="rounded-xl overflow-hidden bg-neutral-700"
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={["#475569", "#0f172a"]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <ActivityIndicator size="large" color="#F5F3F0" />
            <Text className="text-off-white text-base font-semibold mt-2">
              Loading Adhan times
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 320,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      <View className="rounded-xl overflow-hidden" style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE_URL }}
          className="flex-1"
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "rgba(30, 41, 59, 0.6)",
              "rgba(15, 23, 42, 0.8)",
              "rgba(0, 0, 0, 0.8)",
            ]}
            start={[0, 0]}
            end={[1, 0]}
            style={{ flex: 1, padding: 16 }}
          >
            {/* Content */}
            <View className="flex-1 justify-between">
              {/* Header */}
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text
                    className="text-white text-lg font-bold mb-1"
                    style={{
                      textShadowColor: "rgba(0, 0, 0, 0.8)",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 4,
                    }}
                  >
                    Adhān
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name="location"
                      size={12}
                      color="rgba(255, 255, 255, 0.9)"
                    />
                    <Text
                      className="text-white/90 text-xs"
                      style={{
                        textShadowColor: "rgba(0, 0, 0, 0.6)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                      }}
                    >
                      {location.city}, {location.country}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Middle Section - Countdown */}
              <View className="items-center justify-center flex-1 px-4">
                <Text
                  className="text-white text-4xl font-bold mb-2"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.9)",
                    textShadowOffset: { width: 0, height: 3 },
                    textShadowRadius: 6,
                  }}
                >
                  {countdown}
                </Text>
                <Text
                  className="text-white/95 text-base font-medium mb-3 text-center"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.7)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 4,
                  }}
                >
                  Until {nextPrayer?.name} ({nextPrayer?.arabic})
                </Text>
                <Text
                  className="text-white/80 text-xs italic text-center px-2"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.6)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
                  }}
                >
                  "Indeed, performing prayers is a duty on the believers at the
                  appointed times."
                </Text>
              </View>

              {/* Footer - Prayer Times */}
              <View>
                <View className="flex-row justify-between mb-3">
                  {mockPrayerTimes.map((prayer) => (
                    <View
                      key={prayer.name}
                      className={`items-center flex-1 ${
                        prayer.next ? "scale-105" : ""
                      }`}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 4,
                          backgroundColor: prayer.next
                            ? "rgba(255, 255, 255, 0.2)"
                            : "transparent",
                          shadowColor: prayer.next ? "#fff" : "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: prayer.next ? 0.3 : 0.2,
                          shadowRadius: 4,
                          elevation: prayer.next ? 4 : 2,
                        }}
                      >
                        <Ionicons
                          name={prayer.icon}
                          size={18}
                          color={
                            prayer.next
                              ? "rgba(255, 255, 255, 1)"
                              : "rgba(245, 243, 240, 0.7)"
                          }
                        />
                      </View>
                      <Text
                        className={`text-xs font-medium mb-0.5 ${
                          prayer.next ? "text-white" : "text-off-white/70"
                        }`}
                        style={{
                          textShadowColor: "rgba(0, 0, 0, 0.7)",
                          textShadowOffset: { width: 0, height: 1 },
                          textShadowRadius: 2,
                        }}
                      >
                        {prayer.name}
                      </Text>
                      <Text
                        className={`text-xs ${
                          prayer.next ? "text-white" : "text-off-white/70"
                        }`}
                        style={{
                          textShadowColor: "rgba(0, 0, 0, 0.6)",
                          textShadowOffset: { width: 0, height: 1 },
                          textShadowRadius: 2,
                        }}
                      >
                        {prayer.time}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Prayer indicators */}
                <View className="flex-row justify-center gap-1.5">
                  {mockPrayerTimes.map((prayer, index) => (
                    <View
                      key={index}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: prayer.next
                          ? "rgba(255, 255, 255, 1)"
                          : "rgba(255, 255, 255, 0.3)",
                        shadowColor: prayer.next ? "#fff" : "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: prayer.next ? 0.5 : 0.2,
                        shadowRadius: 2,
                        elevation: prayer.next ? 2 : 1,
                      }}
                    />
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
}
