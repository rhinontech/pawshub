import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ShieldCheck, Calendar, Download } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusChip from "../../components/ui/StatusChip";

const vaccines = [
  { id: 1, name: "Rabies", date: "Mar 10, 2026", expiry: "Mar 10, 2029", status: "Active", type: "Core" },
  { id: 2, name: "DHPP", date: "Jan 15, 2026", expiry: "Jan 15, 2027", status: "Active", type: "Core" },
  { id: 3, name: "Bordetella", date: "Feb 10, 2026", expiry: "Aug 10, 2026", status: "Soon", type: "Non-Core" },
  { id: 4, name: "Leptospirosis", date: "Mar 22, 2025", expiry: "Mar 22, 2026", status: "Expired", type: "Non-Core" },
];

export default function VaccinesScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Vaccinations</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 }}>
        {vaccines.map((v) => (
          <View key={v.id} style={{ backgroundColor: colors.bgCard, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 20, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} color="#0ea5e9" />
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{v.name}</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{v.type} Vaccine</Text>
                </View>
              </View>
              <StatusChip label={v.status} variant={v.status === 'Active' ? 'success' : v.status === 'Soon' ? 'warning' : 'danger'} />
            </View>

            <View style={{ flexDirection: 'row', gap: 24, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}>
              <View>
                <Text style={{ fontSize: 11, color: colors.textMuted, textTransform: 'uppercase' }}>Last Dose</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginTop: 4 }}>{v.date}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 11, color: colors.textMuted, textTransform: 'uppercase' }}>Next Due</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: v.status === 'Soon' ? '#f59e0b' : colors.textSecondary, marginTop: 4 }}>{v.expiry}</Text>
              </View>
            </View>

            <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, backgroundColor: colors.bgSubtle, borderRadius: 10, marginTop: 12 }}>
              <Download size={14} color={colors.textSecondary} />
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textSecondary }}>Download Certificate</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
