import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/investment" options={{ headerShown: false }} />
        <Stack.Screen name="screens/expense" options={{ headerShown: false }} />
        <Stack.Screen name="screens/income" options={{ headerShown: false }} />
        <Stack.Screen name="screens/yearlyreview" options={{ headerShown: false }} />
        <Stack.Screen name="screens/monthlyreview" options={{ headerShown: false }} />
        <Stack.Screen name="screens/weeklyreview" options={{ headerShown: false }} />



        <Stack.Screen name="screens/settings/account" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/diary" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/email" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/journal" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/notification" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/packinglist" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/ppersonality" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/privacy" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/secret" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/shoppinglist" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
