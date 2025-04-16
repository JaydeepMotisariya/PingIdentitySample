import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { username: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export type UserData = {
  name?: string;
  email: string;
  isLoggedIn: boolean;
  username: string;
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check for stored user data on app start
    const bootstrapAsync = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userData?.isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ username: userData.username }}
            options={{ headerShown: true, title: "Dashboard" }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: true, title: "Dashboard" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
