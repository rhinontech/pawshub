import React from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, TrendingUp, Activity, Weight, Heart } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function VitalsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const stats = [
    { label: "Weight", value: "24.5 kg", trend: "+0.2", icon: Weight, color: "#0ea5e9" },
    { label: "Heart Rate", value: "82 bpm", trend: "-2", icon: Heart, color: "#f43f5e" },
    { label: "Activity", value: "4.2 km/day", trend: "+0.5", icon: Activity, color: "#10b981" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Pet Vitals</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 }}>
        <View style={{ backgroundColor: colors.bgCard, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>Current Overview</Text>
          <View style={{ gap: 20 }}>
            {stats.map((s) => (
              <View key={s.label} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={24} color={s.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ fontSize: 14, color: colors.textMuted }}>{s.label}</Text>
                  <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginTop: 2 }}>{s.value}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: s.trend.startsWith('+') ? colors.successBg : '#fff1f2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <TrendingUp size={14} color={s.trend.startsWith('+') ? '#10b981' : '#e11d48'} style={{ transform: [{ rotate: s.trend.startsWith('+') ? '0deg' : '90deg' }] }} />
                  <Text style={{ fontSize: 12, fontWeight: '700', color: s.trend.startsWith('+') ? '#10b981' : '#e11d48', marginLeft: 4 }}>{s.trend}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 }}>Weight History</Text>
        <View style={{ backgroundColor: colors.bgCard, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160 }}>
            {[40, 60, 45, 80, 70, 90].map((h, i) => (
              <View key={i} style={{ alignItems: 'center', gap: 8 }}>
                <View style={{ width: (width - 120) / 6, height: h, backgroundColor: colors.brand, borderRadius: 6 }} />
                <Text style={{ fontSize: 10, color: colors.textMuted }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
