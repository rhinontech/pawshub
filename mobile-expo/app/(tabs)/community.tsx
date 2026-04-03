import React, { useState } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput, Modal, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Heart, MessageCircle, Share2, Bookmark, Bell, Calendar, Plus, X, ArrowRight, ShieldCheck } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";
import EventCard from "../../components/ui/EventCard";

const postCategories = ["General", "Health", "Adoption", "Training", "Nutrition", "Lost & Found"];

const categories = ["All", "Events", "Health", "Adoption", "Training", "Nutrition"];

const events = [
  { id: 1, title: "Puppy Social Mixer", date: "2026-04-15", month: "APR", day: "15", time: "2:00 PM", location: "Central Park", category: "Social" },
  { id: 2, title: "Vaccination Drive", date: "2026-04-20", month: "APR", day: "20", time: "9:00 AM", location: "Downtown Center", category: "Health" },
];

const posts = [
  // ... existing posts ...
  { id: 1, user: "Emily R.", avatar: require("../../assets/pet-cat.jpg"), petTag: "Luna", category: "Health", time: "2h ago", text: "Just got Luna's vaccines updated! The vet was amazing and she barely noticed. Highly recommend PawCare Clinic! 🐱💉", image: require("../../assets/pet-cat.jpg"), likes: 24, comments: 5 },
  { id: 2, user: "Mike T.", avatar: require("../../assets/pet-dog.jpg"), petTag: "Buddy", category: "Training", time: "5h ago", text: "Finally mastered 'shake paw' after 2 weeks of training! Consistency is key. Any tips for 'roll over'? 🐕", likes: 42, comments: 12 },
  { id: 3, user: "PawsRescue", avatar: require("../../assets/pet-cat.jpg"), petTag: "Adoption", category: "Adoption", time: "1d ago", text: "Meet Whiskers! This gentle 4-year-old tabby is looking for his forever home. Neutered, vaccinated, and great with kids. 🏠❤️", image: require("../../assets/pet-cat.jpg"), likes: 87, comments: 23 },
];

export default function CommunityScreen() {
  const [active, setActive] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [hasPendingPost, setHasPendingPost] = useState(false);
  const { colors } = useTheme();

  const handlePost = () => {
    if (!newPostText.trim()) return;
    setIsModalVisible(false);
    setHasPendingPost(true);
    setNewPostText("");
    // In a real app, this would hit /api/posts with status=pending
  };

  const filtered = active === "All" ? posts : active === "Events" ? [] : posts.filter((p) => p.category === active);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>Community</Text>
          </View>

          {/* Verification Banner */}
          {hasPendingPost && (
            <View style={{ backgroundColor: colors.infoBg + '40', borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.brand + '20', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand + '10', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>Post Under Review</Text>
                <Text style={{ fontSize: 11, color: colors.textMuted }}>Your {selectedCategory} post is being verified by admins.</Text>
              </View>
              <Pressable onPress={() => setHasPendingPost(false)}><X size={16} color={colors.textMuted} /></Pressable>
            </View>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24, marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
            {categories.map((c) => (
              <Pressable
                key={c}
                onPress={() => setActive(c)}
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: active === c ? colors.brand : colors.bgSubtle }}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: active === c ? '#fff' : colors.textMuted }}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {(active === "All" || active === "Events") && (
            <View style={{ marginBottom: 32 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>Upcoming Events</Text>
                <Pressable><Text style={{ fontSize: 13, fontWeight: '600', color: colors.brand }}>See All</Text></Pressable>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
                {events.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </ScrollView>
            </View>
          )}

          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 }}>
            {active === "Events" ? "Past Events" : "Recent Posts"}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          {active === "Events" && (
            <View style={{ paddingVertical: 40, alignItems: 'center', opacity: 0.5 }}>
              <Calendar size={48} color={colors.textMuted} strokeWidth={1} />
              <Text style={{ marginTop: 12, color: colors.textMuted, fontSize: 14 }}>No past events found</Text>
            </View>
          )}
          {filtered.map((post) => (
            <View key={post.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingTop: 4 }}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Heart size={18} color={colors.textMuted} />
                  <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textMuted }}>{post.likes}</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={18} color={colors.textMuted} />
                  <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textMuted }}>{post.comments}</Text>
                </Pressable>
                <Pressable><Share2 size={18} color={colors.textMuted} /></Pressable>
                <Pressable style={{ marginLeft: 'auto' }}><Bookmark size={18} color={colors.textMuted} /></Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Create Post Button */}
      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={{ position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', shadowColor: colors.brand, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 }}
      >
        <Plus size={24} color="#fff" strokeWidth={3} />
      </Pressable>

      {/* Create Post Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: colors.bgCard, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: '50%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>Create New Post</Text>
              <Pressable onPress={() => setIsModalVisible(false)} style={{ padding: 4 }}>
                <X size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase' }}>Select Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24, marginHorizontal: -24 }} contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}>
              {postCategories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: selectedCategory === cat ? colors.brand : colors.bgSubtle, borderWidth: 1, borderColor: selectedCategory === cat ? colors.brand : colors.border }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: selectedCategory === cat ? '#fff' : colors.textPrimary }}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <TextInput
              placeholder="What's on your mind? Share tips, ask questions, or post updates..."
              placeholderTextColor={colors.textMuted}
              multiline
              value={newPostText}
              onChangeText={setNewPostText}
              style={{ flex: 1, fontSize: 16, color: colors.textPrimary, textAlignVertical: 'top', minHeight: 120, padding: 16, backgroundColor: colors.bgSubtle, borderRadius: 16, borderWidth: 1, borderColor: colors.border }}
            />

            <Pressable
              onPress={handlePost}
              style={{ marginTop: 24, backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Submit for Verification</Text>
              <ArrowRight size={18} color="#fff" />
            </Pressable>
            <Text style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: colors.textMuted }}>Your post will be reviewed by our moderation team before appearing in the feed.</Text>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
