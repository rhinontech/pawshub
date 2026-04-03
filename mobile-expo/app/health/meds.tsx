import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Pill, Clock, Plus } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const meds = [
  { id: 1, name: "Bravecto", dose: "1 Chewable", frequency: "Once every 3 months", type: "Flea & Tick", next: "Jun 12, 2026" },
  { id: 2, name: "Apoquel", dose: "16mg Tablet", frequency: "Once daily", type: "Allergy", next: "Tomorrow" },
];

export default function MedsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Medications</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 }}>
        {meds.map((m) => (
          <View key={m.id} style={{ backgroundColor: colors.bgCard, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 20, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
              <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#fff1f2', alignItems: 'center', justifyContent: 'center' }}>
                <Pill size={26} color="#e11d48" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>{m.name}</Text>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{m.type}</Text>
              </View>
            </View>

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Clock size={16} color={colors.textMuted} />
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>{m.frequency}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: colors.borderSubtle }} />
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>Dose: <Text style={{ fontWeight: '600' }}>{m.dose}</Text></Text>
              </View>
            </View>

            <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.borderSubtle, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>Next due: <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>{m.next}</Text></Text>
              <Pressable style={{ backgroundColor: colors.brand, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#fff' }}>Log Dose</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={{ position: 'absolute', bottom: 100, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', elevation: 8 }}>
        <Plus size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
