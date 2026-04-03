import React, { useState } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useRouter } from "expo-router";
import StatusChip from "../../components/ui/StatusChip";

const patients = [
  { id: "p1", name: "Buddy", owner: "Sarah Johnson", species: "Dog", breed: "Golden Retriever", lastVisit: "Mar 15, 2026", nextVisit: "Apr 15, 2026", status: "Healthy", image: require("../../assets/pet-dog.jpg"), visits: 8 },
  { id: "p2", name: "Luna", owner: "Emily R.", species: "Cat", breed: "Tabby", lastVisit: "Mar 28, 2026", nextVisit: "Apr 28, 2026", status: "Vaccine Due", image: require("../../assets/pet-cat.jpg"), visits: 5 },
  { id: "p3", name: "Snowball", owner: "Anna Kim", species: "Rabbit", breed: "Holland Lop", lastVisit: "Feb 10, 2026", nextVisit: "May 10, 2026", status: "Healthy", image: require("../../assets/pet-bunny.jpg"), visits: 3 },
  { id: "p4", name: "Whiskers", owner: "Tom Lee", species: "Cat", breed: "Tabby", lastVisit: "Mar 28, 2026", nextVisit: "Jun 28, 2026", status: "On Medication", image: require("../../assets/pet-cat.jpg"), visits: 12 },
  { id: "p5", name: "Rex", owner: "Mike T.", species: "Dog", breed: "Mixed", lastVisit: "Jan 22, 2026", nextVisit: "Apr 10, 2026", status: "Check Required", image: require("../../assets/pet-dog.jpg"), visits: 2 },
];

const statusVariant = (s: string): "success" | "warning" | "info" | "danger" => {
  if (s === "Healthy") return "success";
  if (s === "Vaccine Due" || s === "Check Required") return "warning";
  if (s === "On Medication") return "info";
  return "danger";
};

export default function PatientsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.owner.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 }}>My Patients</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 14 }}>
            <Search size={18} color={colors.textMuted} />
            <TextInput
              placeholder="Search by pet or owner..."
              placeholderTextColor={colors.textMuted}
              value={query}
              onChangeText={setQuery}
              style={{ flex: 1, height: 48, marginLeft: 10, fontSize: 14, color: colors.textPrimary }}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {filtered.map((p) => (
            <Pressable 
              key={p.id} 
              onPress={() => router.push(`/pets/${p.name.toLowerCase()}`)}
              style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center' }}
            >
              <Image source={p.image} style={{ width: 56, height: 56, borderRadius: 14 }} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{p.name}</Text>
                  <StatusChip label={p.status} variant={statusVariant(p.status)} />
                </View>
                <Text style={{ fontSize: 13, color: colors.textMuted }}>{p.breed} · {p.owner}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 6 }}>
                  <Text style={{ fontSize: 11, color: colors.textMuted }}>
                    Last: <Text style={{ color: colors.textSecondary, fontWeight: '500' }}>{p.lastVisit}</Text>
                  </Text>
                  <Text style={{ fontSize: 11, color: colors.textMuted }}>
                    Visits: <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>{p.visits}</Text>
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
