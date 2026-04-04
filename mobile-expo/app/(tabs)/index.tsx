import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Image, Pressable, Dimensions, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Bell, Syringe, Stethoscope, Calendar, Heart, ChevronRight, PawPrint } from "lucide-react-native";
import VetCard from "../../components/ui/VetCard";
import { useTheme } from "../../contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const { user } = useAuth();

  const [pets, setPets] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const reminderBgDark: Record<string, string> = {
    warning: "#2d1e00",
    info: "#0c1a3a",
    danger: "#2d0011",
    success: "#002b12",
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'vaccine': return Syringe;
      case 'appointment': return Calendar;
      case 'medication': return Syringe; // or a pill icon if available
      default: return Bell;
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const [petsRes, remindersRes] = await Promise.all([
        api.get('/pets'),
        api.get('/reminders')
      ]);
      setPets(petsRes || []);
      setReminders(remindersRes || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderPetCard = ({ item }: { item: any }) => (
    <View style={{ width: SCREEN_WIDTH - 40, marginRight: 20 }}>
      <Pressable
        onPress={() => router.push(`/pets/${item.id}`)}
        style={{ backgroundColor: colors.heroBg, borderRadius: 28, padding: 20, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.avatar_url ? (
            <Image
              source={{ uri: item.avatar_url }}
              style={{ width: 64, height: 64, borderRadius: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ width: 64, height: 64, borderRadius: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
               <PawPrint size={28} color="#fff" />
            </View>
          )}
          
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: colors.heroSub, marginTop: 2 }}>{item.breed} · {item.age || 'Age Unknown'}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 24, marginTop: 16 }}>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Weight</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.weight || '--'}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Health Score</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.healthScore || '90'}/100</Text>
          </View>
          <View>
            <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Next Visit</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{item.nextVisit || '--'}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
      >
        {/* Greeting */}
        <View style={{ paddingTop: 20, paddingHorizontal: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 13, color: colors.textMuted }}>Good morning 👋</Text>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>Hello, {user?.name?.split(' ')[0] || 'Guest'}</Text>
        </View>

        {/* Pet Cards Slider */}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          {pets.length === 0 ? (
            <View style={{ padding: 20, marginHorizontal: 20, backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, alignItems: 'center' }}>
               <PawPrint size={32} color={colors.textMuted} style={{ marginBottom: 8 }} />
               <Text style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary }}>Welcome to PawsHub!</Text>
               <Text style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 4, marginBottom: 12 }}>Add your first pet to get started.</Text>
               <Pressable onPress={() => router.push("/pets/add")} style={{ backgroundColor: colors.brand, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
                 <Text style={{ color: '#fff', fontWeight: '600' }}>Add Pet</Text>
               </Pressable>
            </View>
          ) : (
            <FlatList
              data={pets}
              renderItem={renderPetCard}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={SCREEN_WIDTH - 20}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 20 }}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>

        {/* Reminders section */}
        {reminders.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textPrimary }}>Upcoming Reminders</Text>
              <Pressable onPress={() => router.push("/reminders")}>
                <Text style={{ fontSize: 14, color: colors.brand, fontWeight: '500' }}>See all</Text>
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
              {reminders.filter(r => !r.isDone).slice(0, 5).map((r) => {
                const isOverdue = r.date && new Date(r.date) < new Date();
                const variant = isOverdue ? 'danger' : 'info';
                const bg = isDark ? reminderBgDark[variant] : (isOverdue ? '#fff1f2' : '#eff6ff');
                const Icon = getReminderIcon(r.type);
                const color = isOverdue ? '#e11d48' : '#0ea5e9';

                return (
                  <Pressable
                    key={r.id.toString()}
                    onPress={() => router.push("/reminders")}
                    style={{ minWidth: 160, backgroundColor: bg, borderRadius: 16, borderWidth: 1, borderColor: isDark ? colors.border : `${color}33`, padding: 14, marginRight: 12 }}
                  >
                    <Icon size={18} color={color} style={{ marginBottom: 8 }} />
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }} numberOfLines={1}>{r.title}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>
                      {r.pet?.name ? `${r.pet.name} · ` : ''}{r.date ? new Date(r.date).toLocaleDateString() : 'No date'}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

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
              <Text style={{ fontSize: 14, color: colors.brand, fontWeight: '500' }}>View all</Text>
            </Pressable>
          </View>
          <VetCard name="PawCare Clinic" distance="0.8 km" rating={4.8} onPress={() => router.push("/(tabs)/discover")} />
          <VetCard name="Happy Tails Hospital" distance="1.2 km" rating={4.6} onPress={() => router.push("/(tabs)/discover")} />
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
