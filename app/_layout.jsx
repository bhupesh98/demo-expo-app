import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Stack, useSegments, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Theme from '@constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TopLevelLayout() {
  const segments = useSegments();
  const isSignedIn = AsyncStorage.getItem('username') === null ? false : true;

  React.useEffect(() => {
    if (isSignedIn && segments[0] !== '(app)') {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/index');
    }
  }, [isSignedIn]);

  return (
    <PaperProvider theme={Theme}>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='register' />
      </Stack>
    </PaperProvider>
  );
}
