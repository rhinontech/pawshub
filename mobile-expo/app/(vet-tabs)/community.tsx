import React, { useState } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Heart, MessageCircle, Share2, Bookmark, Pin } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";

const categories = ["All", "Health", "Adoption", "Training", "Nutrition"];

const posts = [
  { id: 1, user: "Emily R.", avatar: require("../../assets/pet-cat.jpg"), petTag: "Luna", category: "Health", time: "2h ago", text: "Just got Luna's vaccines updated! The vet was amazing and she barely noticed. Highly recommend PawCare Clinic! 🐱💉", image: require("../../assets/pet-cat.jpg"), likes: 24, comments: 5, pinned: false },
  { id: 2, user: "Mike T.", avatar: require("../../assets/pet-dog.jpg"), petTag: "Buddy", category: "Training", time: "5h ago", text: "Finally mastered 'shake paw' after 2 weeks of training! Consistency is key. Any tips for 'roll over'? 🐕", likes: 42, comments: 12, pinned: true },
  { id: 3, user: "PawsRescue", avatar: require("../../assets/pet-cat.jpg"), petTag: "Adoption", category: "Adoption", time: "1d ago", text: "Meet Whiskers! This gentle 4-year-old tabby is looking for his forever home. 🏠❤️", image: require("../../assets/pet-cat.jpg"), likes: 87, comments: 23, pinned: false },
];

export default function VetCommunityScreen() {
  const [active, setActive] = useState("All");
  const { colors } = useTheme();
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 }}>Community</Text>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>Veterinarian view — you can pin important posts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16, marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {categories.map((c) => (
              <Pressable
                key={c}
                onPress={() => setActive(c)}
                style={{ paddingHorizontal: 16, paddingVertical: 6, borderRadius: 999, marginRight: 0, backgroundColor: active === c ? colors.brand : colors.bgSubtle }}
              >
                <Text style={{ fontSize: 14, fontWeight: '500', color: active === c ? '#fff' : colors.textMuted }}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          {filtered.map((post) => (
            <View key={post.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: post.pinned ? colors.brand : colors.border, padding: 16 }}>
              {post.pinned && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Pin size={12} color={colors.brand} />
                  <Text style={{ fontSize: 11, fontWeight: '700', color: colors.brand, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pinned</Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Image source={post.avatar} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{post.user}</Text>
                    <StatusChip label={post.petTag} variant="info" />
                  </View>
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>{post.time}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: colors.textPrimary, lineHeight: 20, marginBottom: 12 }}>{post.text}</Text>
              {post.image && (
                <Image source={post.image} style={{ width: '100%', height: 176, borderRadius: 12, marginBottom: 12 }} resizeMode="cover" />
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                  <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Heart size={18} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>{post.likes}</Text>
                  </Pressable>
                  <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <MessageCircle size={18} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>{post.comments}</Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Pressable><Share2 size={18} color={colors.textMuted} /></Pressable>
                  {/* Vet-exclusive pin button */}
                  <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.infoBg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 }}>
                    <Pin size={14} color={colors.brandText} />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.brandText }}>Pin</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
