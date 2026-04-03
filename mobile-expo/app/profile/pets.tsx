import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Plus, PawPrint, ChevronRight } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import StatusChip from "../../components/ui/StatusChip";

export default function MyPetsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  
  // Mock pet data for the user
  const pets = [
    { id: 'buddy', name: "Buddy", breed: "Golden Retriever", age: "3 yrs", status: "Healthy", image: require("../../assets/pet-dog.jpg") },
    { id: 'luna', name: "Luna", breed: "Tabby Cat", age: "2 yrs", status: "Vaccine Due", image: require("../../assets/pet-cat.jpg") },
    { id: 'snowball', name: "Snowball", breed: "Holland Lop", age: "1 yr", status: "Healthy", image: require("../../assets/pet-bunny.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <ChevronLeft size={20} color={colors.textPrimary} />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>My Pets</Text>
        </View>
        <Pressable 
          onPress={() => router.push('/pets/add')}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={20} color="#fff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {pets.map((pet) => (
          <Pressable 
            key={pet.id} 
            onPress={() => router.push(`/pets/${pet.id}`)}
            style={{ backgroundColor: colors.bgCard, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
          >
            <Image source={pet.image} style={{ width: 64, height: 64, borderRadius: 16 }} resizeMode="cover" />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{pet.name}</Text>
                <StatusChip label={pet.status} variant={pet.status === 'Healthy' ? 'success' : 'warning'} />
              </View>
              <Text style={{ fontSize: 13, color: colors.textMuted }}>{pet.breed} · {pet.age}</Text>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </Pressable>
        ))}

        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textMuted, marginTop: 24 }}>You have {pets.length} active pet profiles.</Text>
      </ScrollView>
    </View>
  );
}
