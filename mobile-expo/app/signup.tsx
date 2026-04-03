import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Heart, Mail, Lock, User, ChevronRight } from "lucide-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Mock signup: just redirect to login for now
    router.replace("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 }}>
          
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: colors.heroBg, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Heart size={32} color="#fff" fill="#fff" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: '800', color: colors.textPrimary }}>Create Account</Text>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 6 }}>Join the PawsHub family today</Text>
          </View>

          <View style={{ gap: 16, marginBottom: 32 }}>
            {/* Name */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16 }}>
              <User size={18} color={colors.textMuted} />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                style={{ flex: 1, height: 52, marginLeft: 12, fontSize: 15, color: colors.textPrimary }}
              />
            </View>

            {/* Email */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16 }}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 16 }}>
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
          </View>

          <Pressable
            onPress={handleSignup}
            style={{ backgroundColor: colors.brand, borderRadius: 14, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Sign Up</Text>
            <ChevronRight size={18} color="#fff" />
          </Pressable>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: colors.brand }}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
