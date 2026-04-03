import React from "react";
import { View, Text, ScrollView, Image, Pressable, Switch } from "react-native";
import { ChevronRight, CalendarDays, Users, Star, Clock, LogOut, Moon, Sun, UserCheck } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

const vetMenuItems = [
  { icon: CalendarDays, label: "Appointment History" },
  { icon: Users, label: "All Patients" },
  { icon: Star, label: "My Reviews" },
  { icon: Clock, label: "Working Hours" },
  { icon: UserCheck, label: "Verification Status" },
];

export default function VetProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout, switchUser } = useAuth();

  // No other vets in production yet
  const otherVets: any[] = [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 24 }}>Profile</Text>

          {/* Vet Hero Card */}
          <View style={{ backgroundColor: colors.heroBg, borderRadius: 28, padding: 24, marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Image source={user?.avatar ?? require("../../assets/pet-cat.jpg")} style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }} resizeMode="cover" />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>{user?.name || "Dr. Anonymous"}</Text>
                <Text style={{ fontSize: 14, color: colors.heroSub, marginTop: 2 }}>{user?.role === 'veterinarian' ? "Verified Professional" : "Veterinarian"}</Text>
                <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>PawsHub Partner</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 32, marginTop: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{user?.rating}</Text>
                <Text style={{ fontSize: 12, color: colors.heroSub, marginTop: 2 }}>Rating</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{user?.yearsExp} yrs</Text>
                <Text style={{ fontSize: 12, color: colors.heroSub, marginTop: 2 }}>Experience</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>48</Text>
                <Text style={{ fontSize: 12, color: colors.heroSub, marginTop: 2 }}>Patients</Text>
              </View>
            </View>
          </View>

          {/* Dark Mode */}
          <View style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {isDark ? <Moon size={20} color={colors.brandText} /> : <Sun size={20} color="#f59e0b" />}
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: colors.textPrimary }}>Dark Mode</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>{isDark ? 'Currently dark' : 'Currently light'}</Text>
                </View>
              </View>
              <Switch value={isDark} onValueChange={async () => await toggleTheme()} trackColor={{ false: colors.border, true: colors.brand }} thumbColor="#fff" ios_backgroundColor={colors.border} />
            </View>
          </View>

          {/* Menu */}
          <View style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 16 }}>
            {vetMenuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Pressable key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: i < vetMenuItems.length - 1 ? 1 : 0, borderBottomColor: colors.border }}>
                  <Icon size={20} color={colors.textMuted} />
                  <Text style={{ flex: 1, fontSize: 14, fontWeight: '500', color: colors.textPrimary }}>{item.label}</Text>
                  <ChevronRight size={16} color={colors.textMuted} />
                </Pressable>
              );
            })}
          </View>

          {/* Dev: Switch Vet */}
          {otherVets.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>⚡ Dev: Switch Vet Account</Text>
              {otherVets.map((v) => (
                <Pressable key={v.id} onPress={async () => await switchUser(v)} style={{ backgroundColor: colors.bgCard, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginBottom: 8 }}>
                  <Image source={v.avatar} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{v.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>{v.clinic}</Text>
                  </View>
                  <ChevronRight size={16} color={colors.textMuted} />
                </Pressable>
              ))}
            </View>
          )}

          {/* Sign Out */}
          <Pressable onPress={async () => await logout()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 16, backgroundColor: '#fff1f2', borderWidth: 1, borderColor: '#fecdd3' }}>
            <LogOut size={18} color="#e11d48" />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#e11d48' }}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
