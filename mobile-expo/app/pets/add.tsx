import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Camera, Check, Trash2 } from "lucide-react-native";
import { useTheme } from "../../contexts/ThemeContext";

const speciesOptions = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Other"];

export default function AddPetScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = !!id;
  const { colors } = useTheme();

  // Mock initial data if editing
  const [name, setName] = useState(isEditing ? "Buddy" : "");
  const [species, setSpecies] = useState(isEditing ? "Dog" : "");
  const [breed, setBreed] = useState(isEditing ? "Golden Retriever" : "");
  const [age, setAge] = useState(isEditing ? "3 yrs" : "");
  const [weight, setWeight] = useState(isEditing ? "24.5 kg" : "");

  const handleSubmit = () => {
    if (!name.trim() || !species) {
      alert("Please fill in at least name and species.");
      return;
    }
    alert(isEditing ? `${name}'s info has been updated! ✨` : `${name} has been added! 🎉`);
    router.back();
  };

  const handleDelete = () => {
    alert(`${name} has been removed from your pets.`);
    router.replace("/(tabs)/pets");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgSubtle, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <ArrowLeft size={20} color={colors.textPrimary} />
          </Pressable>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>{isEditing ? "Edit Pet" : "Add New Pet"}</Text>
          <View style={{ flex: 1 }} />
          {isEditing && (
            <Pressable onPress={handleDelete} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff1f2', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={20} color="#e11d48" />
            </Pressable>
          )}
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Pressable style={{ width: 112, height: 112, borderRadius: 28, backgroundColor: colors.bgSubtle, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={28} color={colors.textMuted} />
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.textMuted, marginTop: 4 }}>Add Photo</Text>
            </Pressable>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>Pet Name</Text>
            <TextInput
              placeholder="e.g. Buddy"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
              style={{ backgroundColor: colors.bgInput, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, height: 48, fontSize: 16, color: colors.textPrimary }}
              maxLength={50}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>Species</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {speciesOptions.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => setSpecies(s)}
                  style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginRight: 8, marginBottom: 8, borderWidth: 1, backgroundColor: species === s ? colors.brand : colors.bgCard, borderColor: species === s ? colors.brand : colors.border }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: species === s ? '#fff' : colors.textSecondary }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>Breed</Text>
            <TextInput
              placeholder="e.g. Golden Retriever"
              placeholderTextColor={colors.textMuted}
              value={breed}
              onChangeText={setBreed}
              style={{ backgroundColor: colors.bgInput, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, height: 48, fontSize: 16, color: colors.textPrimary }}
              maxLength={50}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>Age</Text>
              <TextInput
                placeholder="e.g. 3 yrs"
                placeholderTextColor={colors.textMuted}
                value={age}
                onChangeText={setAge}
                style={{ backgroundColor: colors.bgInput, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, height: 48, fontSize: 16, color: colors.textPrimary }}
                maxLength={20}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>Weight</Text>
              <TextInput
                placeholder="e.g. 28 kg"
                placeholderTextColor={colors.textMuted}
                value={weight}
                onChangeText={setWeight}
                style={{ backgroundColor: colors.bgInput, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, height: 48, fontSize: 16, color: colors.textPrimary }}
                maxLength={20}
              />
            </View>
          </View>

          <Pressable onPress={handleSubmit} style={{ width: '100%', height: 56, backgroundColor: colors.brand, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={20} color="#fff" />
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', marginLeft: 8 }}>{isEditing ? "Save Changes" : "Add Pet"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
