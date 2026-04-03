import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Star, MapPin, Phone, MessageCircle } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import StatusChip from "../../components/ui/StatusChip";

export default function SavedVetsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const savedVets = [
    { id: "v1", name: "PawCare Clinic", distance: "0.8 km", rating: 4.8, specialty: "General", address: "123 Pet Street", phone: "+1 555-0101", hours: "8AM - 8PM", reviews: 142, image: require("../../assets/pet-dog.jpg") },
    { id: "v2", name: "Happy Tails Hospital", distance: "1.2 km", rating: 4.6, specialty: "Surgery", address: "456 Care Ave", phone: "+1 555-0202", hours: "9AM - 6PM", reviews: 98, image: require("../../assets/pet-cat.jpg") },
    { id: "v3", name: "City Animal Care", distance: "2.5 km", rating: 4.9, specialty: "Emergency", address: "789 Rescue Blvd", phone: "+1 555-0303", hours: "24/7", reviews: 256, image: require("../../assets/pet-bunny.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>Saved Veterinarians</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {savedVets.map((vet) => (
          <View key={vet.id} style={{ backgroundColor: colors.bgCard, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Image source={vet.image} style={{ width: 56, height: 56, borderRadius: 16 }} resizeMode="cover" />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{vet.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Star size={12} color="#f59e0b" fill="#f59e0b" />
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 4 }}>{vet.rating} ({vet.reviews} reviews)</Text>
                </View>
              </View>
              <StatusChip label={vet.specialty} variant="info" />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <MapPin size={14} color={colors.textMuted} />
              <Text style={{ fontSize: 13, color: colors.textMuted }}>{vet.address} · {vet.distance}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable style={{ flex: 1, backgroundColor: colors.brand + '15', borderRadius: 12, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                <Phone size={16} color={colors.brand} />
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.brand }}>Call Clinic</Text>
              </Pressable>
              <Pressable style={{ flex: 1, backgroundColor: colors.bgSubtle, borderRadius: 12, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                <MessageCircle size={16} color={colors.textPrimary} />
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>Consult</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
