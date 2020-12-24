import { StatusBar } from 'expo-status-bar';
import React from 'react';
import initFirebase from './firebase';
import { AuthWrapperAlt } from './components/AuthWrapper';
import { Logout } from './components/Logout';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Initialize Firebase
  initFirebase();

  return (
    <View style={styles.container}>
      <AuthWrapperAlt>

        <Text>This only shows when authd</Text>
        <Logout></Logout>
      </AuthWrapperAlt>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
