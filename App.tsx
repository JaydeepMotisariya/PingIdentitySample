/*
/!**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *!/

import React, {useEffect, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  NativeModules,
} from 'react-native';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const { FRAuthSampleBridge } = NativeModules;

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // Track if the bridge has been initialized
  const isInitialized = useRef(false);
  // Start the FRAuthSampleBridge and set the initialization state
  useEffect(() => {
    const initializeFRAuth = async () => {
      try {
        if(!isInitialized.current && FRAuthSampleBridge) {
          await FRAuthSampleBridge.start();
        }
        // Await the asynchronous operation Set the state once initialized
      } catch (error) {
        console.error('Error initializing FRAuthSampleBridge:', error);
      }
    };
    initializeFRAuth();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /!*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   *!/
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
*/

import React, {useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen.tsx';
import {
  NativeModules,
} from 'react-native';

const { FRAuthSampleBridge } = NativeModules;

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { username: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  // Track if the bridge has been initialized
  const isInitialized = useRef(false);
  // Start the FRAuthSampleBridge and set the initialization state
  useEffect(() => {
    const initializeFRAuth = async () => {
      try {
        if(!isInitialized.current && FRAuthSampleBridge) {
          await FRAuthSampleBridge.start();
        }
        // Await the asynchronous operation Set the state once initialized
      } catch (error) {
        console.error('Error initializing FRAuthSampleBridge:', error);
      }
    };
    initializeFRAuth();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
