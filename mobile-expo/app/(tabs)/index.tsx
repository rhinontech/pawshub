import { View, Text, ScrollView, Image, Pressable, Dimensions, FlatList } from "react-native";
import { Bell, Syringe, Stethoscope, Calendar, Heart, ChevronRight } from "lucide-react-native";
import VetCard from "../../components/ui/VetCard";
import { useTheme } from "../../contexts/ThemeContext";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const pets = [
  { id: '1', name: "Buddy", breed: "Golden Retriever", age: "3 yrs", weight: "28 kg", healthScore: 92, nextVisit: "Apr 15", image: require("../../assets/pet-dog.jpg") },
  { id: '2', name: "Luna", breed: "Tabby Cat", age: "2 yrs", weight: "4.5 kg", healthScore: 95, nextVisit: "Apr 22", image: require("../../assets/pet-cat.jpg") },
];

const reminders = [
  { id: 1, icon: Syringe, title: "Rabies Vaccine", subtitle: "Due in 3 days", variant: "warning" as const, color: "#f59e0b", bg: "#fffbeb", route: "/health/vaccines" },
  { id: 2, icon: Calendar, title: "Vet Checkup", subtitle: "Apr 15, 10:00 AM", variant: "info" as const, color: "#0ea5e9", bg: "#eff6ff", route: "/reminders" },
  { id: 3, icon: Syringe, title: "Deworming", subtitle: "Overdue by 2 days", variant: "danger" as const, color: "#e11d48", bg: "#fff1f2", route: "/health/meds" },
];

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const reminderBgDark: Record<string, string> = {
    warning: "#2d1e00",
    info: "#0c1a3a",
    danger: "#2d0011",
  };

  const renderPetCard = ({ item }: { item: typeof pets[0] }) => (
    <View style={{ width: SCREEN_WIDTH - 40, marginRight: 20 }}>
      <Pressable
        onPress={() => router.push(`/pets/${item.id}`)}
        style={{ backgroundColor: colors.heroBg, borderRadius: 28, padding: 20, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={item.image}
            style={{ width: 64, height: 64, borderRadius: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }}
            resizeMode="cover"
          />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: colors.heroSub, marginTop: 2 }}>{item.breed} · {item.age}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 24, marginTop: 16 }}>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Weight</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.weight}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Health Score</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.healthScore}/100</Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Next Visit</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.nextVisit}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Greeting */}
        <View style={{ paddingTop: 20, paddingHorizontal: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 13, color: colors.textMuted }}>Good morning 👋</Text>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>Hello, Sarah</Text>
        </View>

        {/* Pet Cards Slider */}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <FlatList
            data={pets}
            renderItem={renderPetCard}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - 20}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Reminders section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>Upcoming Reminders</Text>
            <Pressable onPress={() => router.push("/reminders")}>
              <Text style={{ fontSize: 14, color: colors.brandText, fontWeight: '500' }}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {reminders.map((r) => {
              const bg = isDark ? reminderBgDark[r.variant] : r.bg;
              return (
                <Pressable
                  key={r.title}
                  onPress={() => router.push(r.route as any)}
                  style={{ minWidth: 160, backgroundColor: bg, borderRadius: 16, borderWidth: 1, borderColor: isDark ? colors.border : `${r.color}33`, padding: 14, marginRight: 12 }}
                >
                  <r.icon size={18} color={r.color} style={{ marginBottom: 8 }} />
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{r.title}</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{r.subtitle}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Quick Actions grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Pressable
              onPress={() => router.push("/health/vaccines")}
              style={{ flex: 1, backgroundColor: colors.successBg, borderRadius: 16, padding: 16, alignItems: 'center', gap: 8 }}
            >
              <Syringe size={22} color="#10b981" />
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#10b981', textAlign: 'center' }}>Log Vaccine</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(tabs)/discover")}
              style={{ flex: 1, backgroundColor: colors.infoBg, borderRadius: 16, padding: 16, alignItems: 'center', gap: 8 }}
            >
              <Stethoscope size={22} color="#0ea5e9" />
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#0ea5e9', textAlign: 'center' }}>Find Vet</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/health/vitals")}
              style={{ flex: 1, backgroundColor: isDark ? '#2d0a20' : '#fdf2f8', borderRadius: 16, padding: 16, alignItems: 'center', gap: 8 }}
            >
              <Heart size={22} color="#ec4899" />
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#ec4899', textAlign: 'center' }}>Vitals</Text>
            </Pressable>
          </View>
        </View>

        {/* Nearby Vets */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>Nearby Vets</Text>
            <Pressable onPress={() => router.push("/(tabs)/discover")}>
              <Text style={{ fontSize: 14, color: colors.brandText, fontWeight: '500' }}>View all</Text>
            </Pressable>
          </View>
          <VetCard name="PawCare Clinic" distance="0.8 km" rating={4.8} onPress={() => router.push("/discover")} />
          <VetCard name="Happy Tails Hospital" distance="1.2 km" rating={4.6} onPress={() => router.push("/discover")} />
        </View>

        {/* Community Spotlight */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 12 }}>Community Spotlight</Text>
          <Pressable
            onPress={() => router.push("/(tabs)/community")}
            style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Image source={require("../../assets/pet-cat.jpg")} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Luna found her forever home!</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>Posted by PawsRescue · 2h ago</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>After 3 months at the shelter, Luna was adopted by a wonderful family. 🎉</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
