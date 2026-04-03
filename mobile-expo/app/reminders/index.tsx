import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Bell, Calendar, Clock, AlertCircle } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusChip from "../../components/ui/StatusChip";

const allReminders = [
  { id: 1, title: "Rabies Vaccine", due: "Today", pet: "Buddy", image: require("../../assets/pet-dog.jpg"), status: "Urgent", type: "Medical" },
  { id: 2, title: "Heartworm Pill", due: "Tomorrow", pet: "Luna", image: require("../../assets/pet-cat.jpg"), status: "Pending", type: "Meds" },
  { id: 3, title: "Annual Vet Checkup", due: "Apr 15", pet: "Cotton", image: require("../../assets/pet-bunny.jpg"), status: "Upcoming", type: "Checkup" },
  { id: 4, title: "Deworming", due: "Apr 20", pet: "Buddy", image: require("../../assets/pet-dog.jpg"), status: "Upcoming", type: "Medical" },
];

export default function RemindersScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Reminders</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 }}>
        {allReminders.map((r) => (
          <Pressable key={r.id} style={{ backgroundColor: colors.bgCard, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: r.status === 'Urgent' ? '#fff1f2' : colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={24} color={r.status === 'Urgent' ? '#e11d48' : colors.brand} />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{r.title}</Text>
                <StatusChip label={r.status} variant={r.status === 'Urgent' ? 'danger' : r.status === 'Pending' ? 'warning' : 'info'} />
              </View>
              <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{r.pet} · Due {r.due}</Text>
            </View>
            <AlertCircle size={18} color={colors.textMuted} />
          </Pressable>
        ))}

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase' }}>Recently Completed</Text>
          <View style={{ opacity: 0.6 }}>
            <View style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 14, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, fontSize: 14, color: colors.textSecondary }}>Grooming Session</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>Mar 28</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
