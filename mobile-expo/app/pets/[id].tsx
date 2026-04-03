import React from "react";
import { View, Text, ScrollView, Image, Pressable, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Syringe, Pill, Calendar, FileText, ChevronRight, Edit3, Heart, Home } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";

const petsData: Record<string, any> = {
  buddy: {
    name: "Buddy", species: "Dog", breed: "Golden Retriever", age: "3 yrs", weight: "28 kg",
    image: require("../../assets/pet-dog.jpg"), status: "Healthy", healthScore: 92,
    vaccines: [
      { name: "Rabies", date: "2025-01-15", status: "done" },
      { name: "DHPP", date: "2025-06-20", status: "due" },
      { name: "Bordetella", date: "2024-11-10", status: "done" },
    ],
    medications: [
      { name: "Heartgard Plus", dosage: "1 chewable", frequency: "Monthly" },
      { name: "NexGard", dosage: "1 tablet", frequency: "Monthly" },
    ],
    appointments: [{ title: "Annual Checkup", date: "Apr 15, 2026", vet: "PawCare Clinic" }],
  },
  luna: {
    name: "Luna", species: "Cat", breed: "Tabby", age: "2 yrs", weight: "4.5 kg",
    image: require("../../assets/pet-cat.jpg"), status: "Vaccine Due", healthScore: 78,
    vaccines: [{ name: "FVRCP", date: "2025-04-10", status: "due" }],
    medications: [],
    appointments: [],
  },
  snowball: {
    name: "Snowball", species: "Rabbit", breed: "Holland Lop", age: "1 yr", weight: "1.8 kg",
    image: require("../../assets/pet-bunny.jpg"), status: "Healthy", healthScore: 95,
    vaccines: [],
    medications: [],
    appointments: [],
  },
};

const statusVariant = (s: string) => {
  if (s === "Healthy") return "success";
  if (s === "Vaccine Due") return "warning";
  return "danger";
};

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const pet = petsData[id as string] || petsData['buddy'];

  const [isAdoptionOpen, setIsAdoptionOpen] = React.useState(false);
  const [isFosterOpen, setIsFosterOpen] = React.useState(false);

  const quickActions = [
    { icon: Syringe, label: "Vaccines", color: "#10b981", bg: colors.successBg, path: "/health/vaccines" },
    { icon: Pill, label: "Meds", color: "#0ea5e9", bg: colors.infoBg, path: "/health/meds" },
    { icon: Calendar, label: "Visits", color: "#f59e0b", bg: colors.warningBg, path: "/health/records" },
    { icon: FileText, label: "Records", color: "#8b5cf6", bg: colors.bgSubtle, path: "/health/records" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <ArrowLeft size={20} color={colors.textPrimary} />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>Pet Profile</Text>
        </View>
        <Pressable 
          onPress={() => router.push(`/pets/add?id=${id}`)}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}
        >
          <Edit3 size={18} color={colors.brand} />
        </Pressable>
      </View>

      {/* Hero */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ backgroundColor: colors.heroBg, borderRadius: 28, padding: 20, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={pet.image} style={{ width: 96, height: 96, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }} resizeMode="cover" />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: '#fff' }}>{pet.name}</Text>
                <StatusChip label={pet.status} variant={statusVariant(pet.status) as any} />
              </View>
              <Text style={{ fontSize: 14, color: colors.heroSub }}>{pet.breed} · {pet.species}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 24, marginTop: 16 }}>
            <View>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Age</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{pet.age}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Weight</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{pet.weight}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Health</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{pet.healthScore}/100</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Public Status Toggles */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Public Listings</Text>
        <View style={{ backgroundColor: colors.bgCard, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 20, gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} color={isAdoptionOpen ? colors.brand : colors.textMuted} fill={isAdoptionOpen ? colors.brand : 'transparent'} />
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>Open for Adoption</Text>
                <Text style={{ fontSize: 11, color: colors.textMuted }}>Make pet profile public for permanent adoption</Text>
              </View>
            </View>
            <Switch 
              value={isAdoptionOpen} 
              onValueChange={setIsAdoptionOpen} 
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor="#fff"
            />
          </View>

          <View style={{ height: 1, backgroundColor: colors.border }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <Home size={20} color={isFosterOpen ? colors.brand : colors.textMuted} />
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>Open for Foster</Text>
                <Text style={{ fontSize: 11, color: colors.textMuted }}>Looking for temporary caregivers in your city</Text>
              </View>
            </View>
            <Switch 
              value={isFosterOpen} 
              onValueChange={setIsFosterOpen} 
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor="#fff"
            />
          </View>

          {(isAdoptionOpen || isFosterOpen) && (
            <View style={{ marginTop: 8, padding: 12, backgroundColor: colors.infoBg + '40', borderRadius: 12, borderLeftWidth: 3, borderLeftColor: colors.brand }}>
              <Text style={{ fontSize: 11, color: colors.textPrimary, fontWeight: '500' }}>Your pet is now listed in your city's Discover feed. You will receive notifications for any applications.</Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        {[
          { icon: Syringe, label: "Vaccines", color: "#10b981", bg: colors.successBg, path: "/health/vaccines" },
          { icon: Pill, label: "Meds", color: "#0ea5e9", bg: colors.infoBg, path: "/health/meds" },
          { icon: Calendar, label: "Visits", color: "#f59e0b", bg: colors.warningBg, path: "/health/records" },
          { icon: FileText, label: "Records", color: "#8b5cf6", bg: colors.bgSubtle, path: "/health/records" },
        ].map(({ icon: Icon, label, color, bg, path }) => (
          <Pressable 
            key={label} 
            onPress={() => path && router.push(path)}
            style={{ flex: 1, backgroundColor: bg, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center', paddingVertical: 12, gap: 6 }}
          >
            <Icon size={20} color={color} />
            <Text style={{ fontSize: 11, fontWeight: '600', color: colors.textSecondary }}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Vaccines */}
      {pet.vaccines && pet.vaccines.length > 0 ? (
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Vaccine Tracker</Text>
          {pet.vaccines.map((v: any, i: number) => (
            <View key={i} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: v.status === 'done' ? colors.successBg : colors.warningBg, alignItems: 'center', justifyContent: 'center' }}>
                <Syringe size={18} color={v.status === 'done' ? '#047857' : '#b45309'} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{v.name}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{v.date}</Text>
              </View>
              <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: v.status === 'done' ? colors.successBg : colors.warningBg }}>
                <Text style={{ fontSize: 11, fontWeight: '600', textTransform: 'capitalize', color: v.status === 'done' ? '#047857' : '#b45309' }}>{v.status}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      {/* Medications */}
      {pet.medications && pet.medications.length > 0 ? (
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Medications</Text>
          {pet.medications.map((m: any, i: number) => (
            <View key={i} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center' }}>
                <Pill size={18} color="#0369a1" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{m.name}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{m.dosage} · {m.frequency}</Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </View>
          ))}
        </View>
      ) : null}

      {/* Appointments */}
      {pet.appointments && pet.appointments.length > 0 ? (
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Upcoming Appointments</Text>
          {pet.appointments.map((a: any, i: number) => (
            <View key={i} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.warningBg, alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={18} color="#f59e0b" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{a.title}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{a.date} · {a.vet}</Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}
