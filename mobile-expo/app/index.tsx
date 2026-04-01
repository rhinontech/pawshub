import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function HelloWorld() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-6">
        <View className="bg-primary-900 p-8 rounded-3xl shadow-lg">
          <Text className="text-white text-3xl font-bold text-center">
            pawshub
          </Text>
          <Text className="text-blue-100 text-lg mt-2 text-center">
            Hello World!
          </Text>
        </View>
        
        <View className="mt-8">
          <Text className="text-slate-600 text-center">
            Welcome to the future of pet care.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
