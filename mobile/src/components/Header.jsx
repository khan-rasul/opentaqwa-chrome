import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Languages, User, MapPin, LogOut, Bell } from "lucide-react-native";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data - replace with actual hooks later
  const isAuthenticated = false;
  const user = null;
  const nextPrayerDisplay = "Asr - 3:30 PM";
  const location = { city: "New York", country: "USA" };
  const notificationsEnabled = true;

  const getUserInitials = (user) => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <View
      style={{
        borderRadius: 12,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // Shadow for Android
        elevation: 8,
      }}
    >
      <View className="rounded-xl overflow-hidden">
        <View className="flex-row justify-between items-center">
          {/* Left side - Prayer Info */}
          <View className="flex-row items-center gap-2 flex-1">
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />

            <View className="flex-1">
              <Text
                className="text-white text-sm font-bold"
                numberOfLines={1}
                style={{
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                {nextPrayerDisplay}
              </Text>
              <View className="flex-row items-center gap-0.5">
                <MapPin size={10} color="rgba(255, 255, 255, 0.7)" />
                <Text
                  className="text-white/80 text-[10px]"
                  numberOfLines={1}
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.4)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {location.city}, {location.country}
                </Text>
              </View>
            </View>
          </View>

          {/* Right side - Action Buttons */}
          <View className="flex-row items-center gap-1.5">
            {/* Notification Button */}
            <TouchableOpacity
              onPress={() => console.log("Notifications pressed")}
              className="relative"
              style={{
                padding: 7,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 4,
              }}
              activeOpacity={0.7}
            >
              <Bell size={14} color="rgba(255, 255, 255, 0.9)" />
              {notificationsEnabled && (
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    width: 6,
                    height: 6,
                    backgroundColor: "#af8f69",
                    borderRadius: 3,
                    shadowColor: "#af8f69",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                />
              )}
            </TouchableOpacity>

            {/* Language Button */}
            <TouchableOpacity
              onPress={() => console.log("Language pressed")}
              style={{
                padding: 7,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 4,
              }}
              activeOpacity={0.7}
            >
              <Languages size={14} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>

            {/* User Button */}
            <TouchableOpacity
              onPress={() => console.log("User pressed")}
              style={{
                backgroundColor: isAuthenticated ? "#af8f69" : "transparent",
                borderRadius: 16,
                padding: 7,
                width: 32,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 4,
              }}
              activeOpacity={0.7}
            >
              {isAuthenticated ? (
                <Text
                  className="text-white text-[10px] font-bold"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}
                >
                  {getUserInitials(user)}
                </Text>
              ) : (
                <User size={14} color="rgba(255, 255, 255, 0.9)" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
