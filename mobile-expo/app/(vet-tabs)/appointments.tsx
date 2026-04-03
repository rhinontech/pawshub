import React, { useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import StatusChip from "../../components/ui/StatusChip";

const allAppointments = [
  // Upcoming
  { id: 1, pet: "Buddy", owner: "Sarah Johnson", species: "Dog", breed: "Golden Retriever", date: "Today", time: "10:00 AM", reason: "Annual Checkup", status: "confirmed", image: require("../../assets/pet-dog.jpg") },
  { id: 2, pet: "Whiskers", owner: "Tom Lee", species: "Cat", breed: "Tabby", date: "Today", time: "11:30 AM", reason: "Dental Cleaning", status: "confirmed", image: require("../../assets/pet-cat.jpg") },
  { id: 3, pet: "Cotton", owner: "Anna Kim", species: "Rabbit", breed: "Holland Lop", date: "Today", time: "2:00 PM", reason: "Health Check", status: "pending", image: require("../../assets/pet-bunny.jpg") },
  { id: 4, pet: "Luna", owner: "Emily R.", species: "Cat", breed: "Tabby", date: "Tomorrow", time: "9:00 AM", reason: "Vaccine Due", status: "confirmed", image: require("../../assets/pet-cat.jpg") },
  { id: 5, pet: "Rex", owner: "Mike T.", species: "Dog", breed: "Mixed", date: "Apr 10", time: "3:00 PM", reason: "Skin Issue", status: "pending", image: require("../../assets/pet-dog.jpg") },
  // Past
  { id: 6, pet: "Mochi", owner: "Jane D.", species: "Cat", breed: "Siamese", date: "Mar 28", time: "10:00 AM", reason: "Neutering", status: "done", image: require("../../assets/pet-cat.jpg") },
  { id: 7, pet: "Buddy", owner: "Sarah Johnson", species: "Dog", breed: "Golden Retriever", date: "Mar 15", time: "2:30 PM", reason: "Vaccine (DHPP)", status: "done", image: require("../../assets/pet-dog.jpg") },
  { id: 8, pet: "Snowball", owner: "Sarah Johnson", species: "Rabbit", breed: "Holland Lop", date: "Mar 10", time: "11:00 AM", reason: "General Check", status: "cancelled", image: require("../../assets/pet-bunny.jpg") },
];

const tabs = ["Upcoming", "Past"];

const statusIcon = (s: string) => {
  if (s === 'confirmed') return <CheckCircle size={18} color="#10b981" />;
  if (s === 'pending') return <AlertCircle size={18} color="#f59e0b" />;
  if (s === 'done') return <CheckCircle size={18} color="#64748b" />;
  return <XCircle size={18} color="#f43f5e" />;
};

const statusVariant = (s: string): "success" | "warning" | "info" | "danger" => {
  if (s === 'confirmed') return 'success';
  if (s === 'pending') return 'warning';
  if (s === 'done') return 'info';
  return 'danger';
};

export default function AppointmentsScreen() {
  const { colors } = useTheme();
  const [active, setActive] = useState("Upcoming");

  const upcoming = allAppointments.filter((a) => a.status !== 'done' && a.status !== 'cancelled');
  const past = allAppointments.filter((a) => a.status === 'done' || a.status === 'cancelled');
  const list = active === "Upcoming" ? upcoming : past;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 }}>Appointments</Text>

          {/* Tab Toggle */}
          <View style={{ flexDirection: 'row', backgroundColor: colors.bgSubtle, borderRadius: 12, padding: 4, marginBottom: 4 }}>
            {tabs.map((t) => (
              <Pressable
                key={t}
                onPress={() => setActive(t)}
                style={{ flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', backgroundColor: active === t ? colors.bgCard : 'transparent' }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: active === t ? colors.textPrimary : colors.textMuted }}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {list.map((appt) => (
            <Pressable key={appt.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Image source={appt.image} style={{ width: 52, height: 52, borderRadius: 14 }} resizeMode="cover" />
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{appt.pet}</Text>
                    <StatusChip label={appt.species} variant="info" />
                  </View>
                  <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{appt.breed} · {appt.owner}</Text>
                </View>
                {statusIcon(appt.status)}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} color={colors.textMuted} />
                  <Text style={{ fontSize: 13, color: colors.textMuted }}>{appt.date} · {appt.time}</Text>
                </View>
                <StatusChip label={appt.status.charAt(0).toUpperCase() + appt.status.slice(1)} variant={statusVariant(appt.status)} />
              </View>

              <View style={{ backgroundColor: colors.bgSubtle, borderRadius: 10, padding: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 13, color: colors.textSecondary }}>📋 <Text style={{ fontWeight: '600' }}>Reason:</Text> {appt.reason}</Text>
              </View>

              {appt.status === 'pending' && (
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                  <Pressable style={{ flex: 1, backgroundColor: colors.successBg, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#10b981' }}>✓ Confirm</Text>
                  </Pressable>
                  <Pressable style={{ flex: 1, backgroundColor: '#fff1f2', borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#e11d48' }}>✕ Decline</Text>
                  </Pressable>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
