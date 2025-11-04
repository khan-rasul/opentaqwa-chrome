import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Card({ title, subtitle, route, gradientColors }) {
  const router = useRouter();

  return (
    <View
      style={{
        height: 80,
        borderRadius: 12,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        // Shadow for Android
        elevation: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push(route)}
        className="rounded-xl overflow-hidden"
        style={{ flex: 1 }}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 0]}
          style={{ flex: 1, padding: 12, position: "relative" }}
        >
          {/* Decorative circle */}
          <View
            style={{
              position: "absolute",
              top: -15,
              left: -15,
              width: 50,
              height: 50,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 25,
            }}
          />

          {/* Subtitle - Top Left */}
          {subtitle && (
            <View style={{ position: "absolute", top: 8, left: 10 }}>
              <Text
                className="text-white/60 text-[10px] font-light"
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.7)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                {subtitle}
              </Text>
            </View>
          )}

          {/* Title - Bottom Right */}
          <View style={{ position: "absolute", bottom: 8, right: 10 }}>
            <Text
              className="text-white text-base font-bold text-right"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.8)",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 5,
              }}
            >
              {title}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
