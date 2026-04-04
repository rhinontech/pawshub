import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Pressable, TextInput, Modal, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, RefreshControl } from "react-native";
import { Heart, MessageCircle, Share2, Bookmark, Bell, Calendar, Plus, X, ArrowRight, ShieldCheck, PawPrint } from "lucide-react-native";
import StatusChip from "../../components/ui/StatusChip";
import { useTheme } from "../../contexts/ThemeContext";
import EventCard from "../../components/ui/EventCard";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const postCategories = ["General", "Health", "Adoption", "Training", "Nutrition", "Lost & Found"];
const categories = ["All", "Events", "Health", "Adoption", "Training", "Nutrition"];

// Remove dummy events

function timeAgo(date: string) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "just now";
}

export default function CommunityScreen() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [hasPendingPost, setHasPendingPost] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeed = async () => {
    try {
      const [feedData, eventsData] = await Promise.all([
        api.get('/community/feed'),
        api.get('/community/events')
      ]);
      setPosts(feedData || []);
      
      const formattedEvents = (eventsData || []).map((e: any) => {
        const d = new Date(e.date);
        return {
          ...e,
          month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
          day: d.getDate().toString()
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching community data", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const handlePost = async () => {
    if (!newPostText.trim()) return;
    setSubmitting(true);
    try {
      await api.post('/community/posts', {
        content: newPostText,
        category: selectedCategory,
      });
      setIsModalVisible(false);
      setHasPendingPost(true);
      setNewPostText("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to submit post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await api.post(`/community/posts/${postId}/like`);
      // Optimistically update local state if we want, or just re-fetch or map update
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          const isLiked = res.liked;
          const newLikes = isLiked 
            ? [...p.likes, { userId: user?.id }] 
            : p.likes.filter((l: any) => l.userId !== user?.id);
          return { ...p, likes: newLikes };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const isPostLiked = (postLikes: any[]) => {
    return postLikes.some((l: any) => l.userId === user?.id);
  };

  const filteredPosts = active === "All" 
    ? posts 
    : posts.filter((p) => p.category === active);

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
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
      >
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
          {active !== "Events" && filteredPosts.length === 0 && (
            <View style={{ paddingVertical: 40, alignItems: 'center', opacity: 0.5 }}>
              <MessageCircle size={48} color={colors.textMuted} strokeWidth={1} />
              <Text style={{ marginTop: 12, color: colors.textMuted, fontSize: 14 }}>No posts found for this category</Text>
            </View>
          )}
          {active !== "Events" && filteredPosts.map((post) => (
            <View key={post.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                {post.author?.avatar_url ? (
                  <Image source={{ uri: post.author.avatar_url }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
                ) : (
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center' }}>
                    <PawPrint size={20} color={colors.brand} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{post.author?.name || 'User'}</Text>
                    <StatusChip label={post.author?.role?.toUpperCase() || 'MEMBER'} variant="info" />
                  </View>
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>{timeAgo(post.createdAt)} · {post.category}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, color: colors.textPrimary, lineHeight: 20, marginBottom: 12 }}>{post.content}</Text>
              {post.imageUrl && (
                <Image source={{ uri: post.imageUrl }} style={{ width: '100%', height: 176, borderRadius: 12, marginBottom: 12 }} resizeMode="cover" />
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingTop: 4 }}>
                <Pressable onPress={() => handleLike(post.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Heart size={18} color={isPostLiked(post.likes) ? "#f43f5e" : colors.textMuted} fill={isPostLiked(post.likes) ? "#f43f5e" : "transparent"} />
                  <Text style={{ fontSize: 12, fontWeight: '500', color: isPostLiked(post.likes) ? "#f43f5e" : colors.textMuted }}>{post.likes?.length || 0}</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={18} color={colors.textMuted} />
                  <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textMuted }}>{post.comments?.length || 0}</Text>
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

            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginBottom: 12, textTransform: 'uppercase' }}>Select Category</Text>
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
              style={{ flex: 1, fontSize: 16, color: colors.textPrimary, textAlignVertical: 'top', minHeight: 120, padding: 16, backgroundColor: colors.bgInput || colors.bgSubtle, borderRadius: 16, borderWidth: 1, borderColor: colors.border }}
            />

            <Pressable
              onPress={handlePost}
              disabled={submitting}
              style={{ marginTop: 24, backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Submit for Verification</Text>
                  <ArrowRight size={18} color="#fff" />
                </>
              )}
            </Pressable>
            <Text style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: colors.textMuted }}>Your post will be reviewed by our moderation team before appearing in the feed.</Text>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
