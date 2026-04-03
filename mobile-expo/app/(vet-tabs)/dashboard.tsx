import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { CalendarDays, PawPrint, Star, Clock, ChevronRight, CheckCircle, AlertCircle } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import StatusChip from "../../components/ui/StatusChip";

const todayAppointments = [
  { id: 1, pet: "Buddy", owner: "Sarah Johnson", species: "Dog", time: "10:00 AM", status: "confirmed", image: require("../../assets/pet-dog.jpg") },
  { id: 2, pet: "Whiskers", owner: "Tom Lee", species: "Cat", time: "11:30 AM", status: "confirmed", image: require("../../assets/pet-cat.jpg") },
  { id: 3, pet: "Cotton", owner: "Anna Kim", species: "Rabbit", time: "2:00 PM", status: "pending", image: require("../../assets/pet-bunny.jpg") },
  { id: 4, pet: "Luna", owner: "Emily R.", species: "Cat", time: "3:30 PM", status: "confirmed", image: require("../../assets/pet-cat.jpg") },
];

const stats = [
  { label: "Today's Appts", value: "4", icon: CalendarDays, color: "#0ea5e9" },
  { label: "Total Patients", value: "48", icon: PawPrint, color: "#10b981" },
  { label: "Avg Rating", value: "4.8", icon: Star, color: "#f59e0b" },
  { label: "Pending", value: "1", icon: Clock, color: "#f43f5e" },
];

export default function VetDashboard() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingTop: 0 }}>
        {/* Greeting */}
        <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16, backgroundColor: colors.bgCard, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 13, color: colors.textMuted }}>Good morning 👋</Text>
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.textPrimary }}>
            {user?.name ?? "Dr. James Wilson"}
          </Text>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
            {user?.clinic} · {user?.specialty}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          {stats.map((s) => (
            <View key={s.label} style={{ width: '47%', backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
              <s.icon size={22} color={s.color} />
              <Text style={{ fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginTop: 10 }}>{s.value}</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Today's Schedule */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>Today's Schedule</Text>
            <Text style={{ fontSize: 14, color: colors.brandText, fontWeight: '500' }}>View all</Text>
          </View>
          {todayAppointments.map((appt) => (
            <Pressable key={appt.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Image source={appt.image} style={{ width: 48, height: 48, borderRadius: 14 }} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{appt.pet}</Text>
                  <StatusChip label={appt.species} variant="info" />
                </View>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{appt.owner}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>{appt.time}</Text>
                </View>
              </View>
              {appt.status === 'confirmed'
                ? <CheckCircle size={20} color="#10b981" />
                : <AlertCircle size={20} color="#f59e0b" />
              }
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
