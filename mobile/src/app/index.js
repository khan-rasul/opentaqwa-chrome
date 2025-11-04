import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../components/Header";
import Tagline from "../components/Tagline";
import PrayerTime from "../components/PrayerTime";
import Verse from "../components/Verse";
import AsmaUlHusna from "../components/AsmaUlHusna";
import Footer from "../components/Footer";
import Card from "../components/Home/Card";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["rgba(98, 84, 67, 0.1)", "#262626", "#242424"]}
      start={[0, 0]}
      end={[0, 1]}
      style={{ flex: 1, backgroundColor: "#242424" }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 12, paddingTop: insets.top }}
      >
        <View className="flex flex-col gap-3">
          <Header />

          {/* First row - Dhikr and Durood */}
          <View className="flex-row gap-3" style={{ height: 80 }}>
            <View style={{ flex: 8 }}>
              <Card
                title="Dhikr"
                subtitle="Remembrance"
                route="/dhikr"
                gradientColors={["#625443", "#625443CC", "#62544333"]}
              />
            </View>
            <View style={{ flex: 10 }}>
              <Card
                title="Durūd"
                subtitle="Blessings"
                route="/durood"
                gradientColors={["#263936", "#263936CC", "#26393633"]}
              />
            </View>
          </View>

          {/* Second row - Dua and Tagline */}
          <View className="flex-row gap-3" style={{ height: 80 }}>
            <View style={{ flex: 2 }}>
              <Card
                title="Du'ā"
                subtitle="Supplication"
                route="/dua"
                gradientColors={["#5E4B56", "#5E4B56CC", "#5E4B5633"]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Tagline />
            </View>
          </View>

          <PrayerTime />
          <Verse />
          <AsmaUlHusna />
          <Footer />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
