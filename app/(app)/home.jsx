import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function home() {

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('email');
    router.navigate('/');
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>home</Text>
      <Button icon='logout' mode='elevated' onPress={handleLogOut}>
        <Text>Logout</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
