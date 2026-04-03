import React from "react";
import { View, Text, Pressable } from "react-native";
import { Stethoscope, MapPin } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface VetCardProps {
  name: string;
  distance: string;
  rating: number;
  onPress?: () => void;
}

export default function VetCard({ name, distance, rating, onPress }: VetCardProps) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, overflow: 'hidden' }}>
      <Pressable 
        onPress={onPress} 
        style={({ pressed }) => [
          { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: pressed ? 'rgba(0,0,0,0.03)' : 'transparent', zIndex: 1 }
        ]}
      />
      <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center' }}>
        <Stethoscope size={20} color="#0ea5e9" />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <MapPin size={12} color={colors.textMuted} />
          <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 4 }}>{distance}</Text>
          <Text style={{ fontSize: 12, color: '#f59e0b', fontWeight: '500', marginLeft: 8 }}>★ {rating}</Text>
        </View>
      </View>
      <Pressable style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.infoBg, borderRadius: 999, borderWidth: 1, borderColor: colors.border, zIndex: 2 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.brandText }}>Call</Text>
      </Pressable>
    </View>
  );
}
