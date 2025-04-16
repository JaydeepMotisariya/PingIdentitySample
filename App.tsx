import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './app/contexts/AuthContext';
import { AuthStack, AppStack } from './app/navigation/Router';
import { NativeModules, ActivityIndicator, View, StyleSheet } from 'react-native';

const { FRAuthSampleBridge } = NativeModules;

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  // Track if the bridge has been initialized
  const isInitialized = useRef(false);

  // Start the FRAuthSampleBridge and set the initialization state
  useEffect(() => {
    const initializeFRAuth = async () => {
      try {
        if (!isInitialized.current && FRAuthSampleBridge) {
          await FRAuthSampleBridge.start();
          isInitialized.current = true;
        }
      } catch (error) {
        console.error('Error initializing FRAuthSampleBridge:', error);
      }
    };

    initializeFRAuth();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
