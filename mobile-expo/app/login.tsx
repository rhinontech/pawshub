import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Heart, Mail, Lock, ChevronRight, Stethoscope } from "lucide-react-native";
import { useAuth, MOCK_USERS, MockUser } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      await login(found);
    } else {
      // Default: log in as first pet owner if no match
      await login(MOCK_USERS[0]);
    }
  };

  const quickLogin = async (user: MockUser) => await login(user);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 }}>

          {/* Logo */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ width: 72, height: 72, borderRadius: 24, backgroundColor: colors.heroBg, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Heart size={36} color="#fff" fill="#fff" />
            </View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.textPrimary }}>PawsHub</Text>
            <Text style={{ fontSize: 15, color: colors.textMuted, marginTop: 6 }}>Your pet health companion</Text>
          </View>

          {/* Login Form */}
          <View style={{ marginBottom: 28 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 }}>Welcome back</Text>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 24 }}>Sign in to continue</Text>

            {/* Email */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16, marginBottom: 12 }}>
              <Mail size={18} color={colors.textMuted} />
              <TextInput
                placeholder="Email address"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ flex: 1, height: 52, marginLeft: 12, fontSize: 15, color: colors.textPrimary }}
              />
            </View>

            {/* Password */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16, marginBottom: 24 }}>
              <Lock size={18} color={colors.textMuted} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ flex: 1, height: 52, marginLeft: 12, fontSize: 15, color: colors.textPrimary }}
              />
            </View>

            <Pressable
              onPress={handleLogin}
              style={{ backgroundColor: colors.brand, borderRadius: 14, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Sign In</Text>
              <ChevronRight size={18} color="#fff" />
            </Pressable>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={{ fontSize: 14, color: colors.textMuted }}>Don't have an account?</Text>
              <Pressable onPress={() => router.push("/signup")}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: colors.brand }}>Sign Up</Text>
              </Pressable>
            </View>
          </View>

          {/* Quick Login Section (Dev) */}
          <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={{ fontSize: 12, color: colors.textMuted, paddingHorizontal: 12, fontWeight: '600' }}>⚡ QUICK LOGIN (DEV)</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            <View style={{ gap: 10 }}>
              {MOCK_USERS.map((user) => (
                <Pressable
                  key={user.id}
                  onPress={() => quickLogin(user)}
                  style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, gap: 14 }}
                >
                  <Image source={user.avatar} style={{ width: 44, height: 44, borderRadius: 22 }} resizeMode="cover" />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.textPrimary }}>{user.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{user.email}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: user.role === 'veterinarian' ? colors.infoBg : colors.successBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                    {user.role === 'veterinarian'
                      ? <Stethoscope size={12} color="#0ea5e9" />
                      : <Heart size={12} color="#10b981" />
                    }
                    <Text style={{ fontSize: 11, fontWeight: '700', color: user.role === 'veterinarian' ? '#0ea5e9' : '#10b981' }}>
                      {user.role === 'veterinarian' ? 'Vet' : 'Pet Owner'}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
