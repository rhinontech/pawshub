import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface EventCardProps {
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  category: string;
  onPress?: () => void;
}

export default function EventCard({
  title,
  day,
  month,
  time,
  location,
  category,
  onPress
}: EventCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        { 
          backgroundColor: colors.bgCard, 
          borderRadius: 20, 
          borderWidth: 1, 
          borderColor: colors.border,
          padding: 16,
          width: 280,
          opacity: pressed ? 0.9 : 1,
          flexDirection: 'row',
          gap: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }
      ]}
    >
      {/* Date Badge */}
      <View style={{ 
        backgroundColor: colors.brand + '10', 
        width: 56, 
        height: 64, 
        borderRadius: 16, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.brand + '20'
      }}>
        <Text style={{ fontSize: 12, fontWeight: '700', color: colors.brand, textTransform: 'uppercase' }}>{month}</Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.brand }}>{day}</Text>
      </View>

      {/* Info Section */}
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 10, fontWeight: '700', color: colors.brand, textTransform: 'uppercase' }}>
          {category}
        </Text>
        <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 }}>
          {title}
        </Text>
        
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Clock size={12} color={colors.textMuted} />
            <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: '500' }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <MapPin size={12} color={colors.textMuted} />
            <Text numberOfLines={1} style={{ fontSize: 12, color: colors.textMuted, fontWeight: '500' }}>{location}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
