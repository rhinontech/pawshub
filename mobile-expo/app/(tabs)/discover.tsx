import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Image, Modal } from "react-native";
import { Search, Stethoscope, MapPin, Star, ShieldCheck, Phone, Clock, Users, X, Heart } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";

const categories = ["All", "Vets", "Adoption", "Foster", "Shelters"];

const vets = [
  { id: "v1", name: "PawCare Clinic", distance: "0.8 km", rating: 4.8, specialty: "General", address: "123 Pet Street", phone: "+1 555-0101", hours: "8AM - 8PM", reviews: 142, image: require("../../assets/pet-dog.jpg") },
  { id: "v2", name: "Happy Tails Hospital", distance: "1.2 km", rating: 4.6, specialty: "Surgery", address: "456 Care Ave", phone: "+1 555-0202", hours: "9AM - 6PM", reviews: 98, image: require("../../assets/pet-cat.jpg") },
  { id: "v3", name: "City Animal Care", distance: "2.5 km", rating: 4.9, specialty: "Emergency", address: "789 Rescue Blvd", phone: "+1 555-0303", hours: "24/7", reviews: 256, image: require("../../assets/pet-bunny.jpg") },
];

const adoptionPets = [
  { id: "a1", name: "Mochi", type: "Cat", age: "1 yr", image: require("../../assets/pet-cat.jpg"), verified: true, tagline: "Playful & affectionate", gender: "Female", weight: "3.5 kg", status: "Adoptable" },
  { id: "a2", name: "Cotton", type: "Rabbit", age: "8 mo", image: require("../../assets/pet-bunny.jpg"), verified: true, tagline: "Gentle & calm", gender: "Male", weight: "1.2 kg", status: "Adoptable" },
  { id: "f1", name: "Oliver", type: "Dog", age: "3 yrs", image: require("../../assets/pet-dog.jpg"), verified: true, tagline: "Needs a temporary home", gender: "Male", weight: "18 kg", status: "Foster Needed", urgent: true },
  { id: "f2", name: "Cleo", type: "Cat", age: "2 mo", image: require("../../assets/pet-cat.jpg"), verified: true, tagline: "Bottle baby needs love", gender: "Female", weight: "0.8 kg", status: "Foster Needed", urgent: true },
  { id: "a3", name: "Rex", type: "Dog", age: "2 yrs", image: require("../../assets/pet-dog.jpg"), verified: false, tagline: "Loyal companion", gender: "Male", weight: "22 kg", status: "Adoptable" },
];

const shelters = [
  { id: "s1", name: "PawsRescue Foundation", distance: "1.5 km", rating: 4.7, animals: 45, type: "Rescues & Shelters", phone: "+1 555-0401", hours: "10AM - 5PM", image: require("../../assets/pet-dog.jpg") },
  { id: "s2", name: "Bunny Haven", distance: "3.2 km", rating: 4.5, animals: 28, type: "Small Animals", phone: "+1 555-0502", hours: "9AM - 4PM", image: require("../../assets/pet-bunny.jpg") },
];

export default function DiscoverScreen() {
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<"vet" | "pet" | "shelter" | null>(null);
  const { colors } = useTheme();

  const closeModal = () => { setSelectedItem(null); setModalType(null); };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 }}>Discover</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgSubtle, borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 }}>
            <Search size={18} color={colors.textMuted} />
            <TextInput
              placeholder="Search vets, shelters, pets..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, height: 48, marginLeft: 8, fontSize: 14, color: colors.textPrimary }}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
            {categories.map((c) => (
              <Pressable
                key={c}
                onPress={() => setActive(c)}
                style={{ paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999, marginRight: 8, backgroundColor: active === c ? colors.brand : colors.bgSubtle }}
              >
                <Text style={{ fontSize: 14, fontWeight: '500', color: active === c ? '#fff' : colors.textMuted }}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Vets */}
        {(active === "All" || active === "Vets") && (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>Nearby Vets</Text>
              <Text style={{ fontSize: 14, color: colors.brandText, fontWeight: '500' }}>View all</Text>
            </View>
            {vets.map((vet) => (
              <Pressable key={vet.id} onPress={() => { setSelectedItem(vet); setModalType("vet"); }} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Stethoscope size={20} color="#0ea5e9" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{vet.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <MapPin size={12} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 4, marginRight: 12 }}>{vet.distance}</Text>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <Text style={{ fontSize: 12, color: '#f59e0b', fontWeight: '700', marginLeft: 4 }}>{vet.rating}</Text>
                  </View>
                </View>
                <StatusChip label={vet.specialty} variant="info" />
              </Pressable>
            ))}
          </View>
        )}

        {/* Adoption & Foster */}
        {(active === "All" || active === "Adoption" || active === "Foster") && (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>
              {active === "Foster" ? "Needs a Foster Home" : "Adoption & Fostering"}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {adoptionPets
                .filter(p => {
                  if (active === "Adoption") return p.status === "Adoptable";
                  if (active === "Foster") return p.status === "Foster Needed";
                  return true;
                })
                .map((pet) => (
                <Pressable key={pet.id} onPress={() => { setSelectedItem(pet); setModalType("pet"); }} style={{ width: '47%', backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }}>
                  <View style={{ position: 'relative' }}>
                    <Image source={pet.image} style={{ width: '100%', height: 120 }} resizeMode="cover" />
                    {pet.verified && (
                      <View style={{ position: 'absolute', top: 8, right: 8, backgroundColor: '#10b981', borderRadius: 999, padding: 4 }}>
                        <ShieldCheck size={12} color="#fff" />
                      </View>
                    )}
                    {pet.status === "Foster Needed" && (
                      <View style={{ position: 'absolute', bottom: 8, left: 8, backgroundColor: colors.infoBg, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: colors.border }}>
                        <Text style={{ fontSize: 9, fontWeight: '700', color: colors.brandText }}>FOSTER</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ padding: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{pet.name} <Text style={{ fontWeight: '400', color: colors.textMuted }}>· {pet.age}</Text></Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>{pet.tagline}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Shelters */}
        {(active === "All" || active === "Shelters") && (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Nearby Shelters</Text>
            {shelters.map((s) => (
              <Pressable key={s.id} onPress={() => { setSelectedItem(s); setModalType("shelter"); }} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Image source={s.image} style={{ width: 44, height: 44, borderRadius: 12 }} resizeMode="cover" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{s.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <MapPin size={12} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 4, marginRight: 12 }}>{s.distance}</Text>
                    <Users size={12} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 4 }}>{s.animals} animals</Text>
                  </View>
                </View>
                <StatusChip label={s.type} variant="info" />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selectedItem} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: colors.bgCard, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, maxHeight: '70%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
                {selectedItem?.name}
              </Text>
              <Pressable onPress={closeModal} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color={colors.textPrimary} />
              </Pressable>
            </View>
            {selectedItem?.image && (
              <Image source={selectedItem.image} style={{ width: '100%', height: 160, borderRadius: 16, marginBottom: 16 }} resizeMode="cover" />
            )}
            {modalType === "vet" && selectedItem && (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Clock size={16} color={colors.textMuted} />
                  <Text style={{ fontSize: 14, color: colors.textSecondary, marginLeft: 8 }}>{selectedItem.hours}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <Phone size={16} color={colors.textMuted} />
                  <Text style={{ fontSize: 14, color: colors.textSecondary, marginLeft: 8 }}>{selectedItem.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Pressable style={{ flex: 1, backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Call Now</Text>
                  </Pressable>
                  <Pressable style={{ flex: 1, backgroundColor: colors.bgSubtle, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
                    <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>Directions</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {modalType === "pet" && selectedItem && (
              <View>
                <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 8 }}>{selectedItem.tagline}</Text>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                  <View style={{ backgroundColor: colors.bgSubtle, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Gender: <Text style={{ fontWeight: '600', color: colors.textPrimary }}>{selectedItem.gender}</Text></Text>
                  </View>
                  <View style={{ backgroundColor: colors.bgSubtle, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Weight: <Text style={{ fontWeight: '600', color: colors.textPrimary }}>{selectedItem.weight}</Text></Text>
                  </View>
                </View>
                <Pressable style={{ backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                  <Heart size={18} color="#fff" />
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Adopt {selectedItem.name}</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
