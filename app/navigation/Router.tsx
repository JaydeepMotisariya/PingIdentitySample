import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { username: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true, title: "Dashboard" }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  // This will be replaced with context-based authentication state
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Router;
