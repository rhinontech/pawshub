import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, FileText, Calendar, Plus } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { api } from "../../services/api";

export default function RecordsScreen() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const { colors } = useTheme();
  
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecords = async () => {
    try {
      if (!petId) return;
      const data = await api.get(`/health/records/${petId}`);
      setRecords(data);
    } catch (error) {
      console.error("Error fetching medical records", error);
      Alert.alert("Error", "Could not load medical records.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [petId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecords();
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={20} color={colors.textPrimary} />
        </Pressable>
        <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' }}>Medical Records</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 4 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
      >
        {records.length === 0 ? (
          <View style={{ paddingVertical: 60, alignItems: 'center', opacity: 0.5 }}>
            <FileText size={48} color={colors.textMuted} strokeWidth={1} />
            <Text style={{ marginTop: 12, color: colors.textMuted, fontSize: 14 }}>No medical records found</Text>
          </View>
        ) : (
          records.map((r, i) => (
            <View key={r.id} style={{ position: 'relative' }}>
              {i < records.length - 1 && (
                <View style={{ position: 'absolute', left: 24, top: 24, bottom: -24, width: 2, backgroundColor: colors.border }} />
              )}
              <View style={{ flexDirection: 'row', marginBottom: 24 }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.heroBg, alignItems: 'center', justifyContent: 'center', zIndex: 1, borderWidth: 4, borderColor: colors.bg }}>
                  <FileText size={20} color="#fff" />
                </View>
                <View style={{ flex: 1, marginLeft: 16, backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>{r.title}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>{new Date(r.date).toLocaleDateString()}</Text>
                  </View>
                  <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{r.clinic_name || 'Generic Clinic'}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
                    <Calendar size={14} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Vet: {r.veterinarian_name || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Pressable 
        onPress={() => {/* TODO: Add record form */}}
        style={{ position: 'absolute', bottom: 40, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', shadowColor: colors.brand, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 }}
      >
        <Plus size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
