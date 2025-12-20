import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <MaterialIcons name="home" size={24} color="white" />,
        }}

      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'calendar',
          tabBarIcon: () => <MaterialIcons name="calendar-today" size={24} color="white" />,
        }}

      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <MaterialIcons name="settings" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Expense',
          tabBarIcon: () => <MaterialIcons name="attach-money" size={24} color="white" />,
        }}
      />
    </Tabs>
  );
}
