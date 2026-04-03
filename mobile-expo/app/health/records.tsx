import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, FileText, Calendar, Plus } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const records = [
  { id: 1, title: "Annual Exam", date: "Mar 15, 2026", vet: "Dr. James Wilson", type: "Checkup", clinic: "PawCare Clinic" },
  { id: 2, title: "Blood Work", date: "Feb 10, 2026", vet: "Dr. Amy Lee", type: "Lab Results", clinic: "Central Vet Hospital" },
  { id: 3, title: "Dental Cleaning", date: "Nov 22, 2025", vet: "Dr. James Wilson", type: "Surgery", clinic: "PawCare Clinic" },
  { id: 4, title: "DHPP Vaccine", date: "Sep 05, 2025", vet: "Dr. Sarah Kim", type: "Vaccine", clinic: "Elite Pet Care" },
];

export default function RecordsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Medical Records</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 4 }}>
        {records.map((r, i) => (
          <View key={r.id} style={{ position: 'relative' }}>
            {i < records.length - 1 && (
              <View style={{ position: 'absolute', left: 24, top: 24, bottom: -24, width: 2, backgroundColor: colors.border }} />
            )}
            <View style={{ flexDirection: 'row', marginBottom: 24 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.heroBg, alignItems: 'center', justifyContent: 'center', zIndex: 1, borderWidth: 4, borderColor: colors.bg }}>
                <FileText size={20} color="#fff" />
              </View>
              <View style={{ flex: 1, marginLeft: 16, backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{r.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>{r.date}</Text>
                </View>
                <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{r.clinic}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
                  <Calendar size={14} color={colors.textMuted} />
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>Vet: {r.vet}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={{ position: 'absolute', bottom: 100, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', shadowColor: colors.brand, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 }}>
        <Plus size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
