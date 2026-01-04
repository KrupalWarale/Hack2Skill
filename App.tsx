import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { locationService } from './src/services/LocationService';

export default function App() {
  useEffect(() => {
    const initializeLocation = async () => {
      await locationService.requestPermissions();
    };

    initializeLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#FAFAFA" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
