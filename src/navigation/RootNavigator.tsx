import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { useAppStore } from '../store/useAppStore';
import { ActivityIndicator, View } from 'react-native';

import { SenderDashboard } from '../screens/SenderDashboard';
import { TransporterDashboard } from '../screens/TransporterDashboard';
import { HandlerDashboard } from '../screens/HandlerDashboard';
import { CreateRequestScreen } from '../screens/CreateRequestScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isInitialized, currentRole, initApp } = useAppStore();

  useEffect(() => {
    initApp();
  }, []);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Role Selection Screen */}
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        
        {/* Protected Screens - Only accessible if role is set, but we define them all to keep nav stack clean */}
        <Stack.Screen name="SenderDashboard" component={SenderDashboard} />
        <Stack.Screen 
          name="CreateRequest" 
          component={CreateRequestScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="TransporterDashboard" component={TransporterDashboard} />
        <Stack.Screen name="HandlerDashboard" component={HandlerDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
