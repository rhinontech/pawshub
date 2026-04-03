import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";

const pets = [
  { id: "buddy", name: "Buddy", species: "Dog", breed: "Golden Retriever", age: "3 yrs", image: require("../../assets/pet-dog.jpg"), reminders: 2, status: "Healthy" as const },
  { id: "luna", name: "Luna", species: "Cat", breed: "Tabby", age: "2 yrs", image: require("../../assets/pet-cat.jpg"), reminders: 1, status: "Vaccine Due" as const },
  { id: "snowball", name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "1 yr", image: require("../../assets/pet-bunny.jpg"), reminders: 0, status: "Healthy" as const },
];

const statusVariant = (s: string) => {
  if (s === "Healthy") return "success" as const;
  if (s === "Vaccine Due") return "warning" as const;
  return "info" as const;
};

export default function PetsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>My Pets</Text>
          <Pressable
            onPress={() => router.push("/pets/add")}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {pets.map((pet) => (
            <Pressable
              key={pet.id}
              onPress={() => router.push(`/pets/${pet.id}`)}
              style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
            >
              <Image source={pet.image} style={{ width: 64, height: 64, borderRadius: 16 }} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginRight: 8 }}>{pet.name}</Text>
                  <StatusChip label={pet.status} variant={statusVariant(pet.status)} />
                </View>
                <Text style={{ fontSize: 14, color: colors.textMuted }}>{pet.breed} · {pet.age}</Text>
                {pet.reminders > 0 ? (
                  <Text style={{ fontSize: 12, color: '#f59e0b', fontWeight: '500', marginTop: 4 }}>
                    {pet.reminders} upcoming reminder{pet.reminders > 1 ? "s" : ""}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
