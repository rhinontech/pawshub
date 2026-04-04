import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Save } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { api } from "../../services/api";

export default function AddVitalScreen() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const { colors } = useTheme();

  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!type || !value || !unit) {
      Alert.alert("Required Fields", "Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/health/vitals/${petId}`, { type, value, unit });
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add vital.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginRight: 40 }}>Log Vital</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Type</Text>
          <TextInput
            placeholder="e.g. Weight, Heart Rate, Temperature"
            placeholderTextColor={colors.textMuted}
            value={type}
            onChangeText={setType}
            style={{ backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, fontSize: 16, color: colors.textPrimary }}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Value</Text>
          <TextInput
            placeholder="e.g. 15, 120, 101.5"
            placeholderTextColor={colors.textMuted}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={{ backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, fontSize: 16, color: colors.textPrimary }}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Unit</Text>
          <TextInput
            placeholder="e.g. kg, lbs, bpm, °F"
            placeholderTextColor={colors.textMuted}
            value={unit}
            onChangeText={setUnit}
            style={{ backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, fontSize: 16, color: colors.textPrimary }}
          />
        </View>
      </ScrollView>

      <View style={{ padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Pressable
          onPress={handleSave}
          disabled={loading}
          style={{ backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 16, alignItems: 'center', opacity: loading ? 0.7 : 1, flexDirection: 'row', justifyContent: 'center', gap: 8 }}
        >
          {loading ? <ActivityIndicator color="#fff" /> : (
            <>
              <Save size={20} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Save Record</Text>
            </>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
