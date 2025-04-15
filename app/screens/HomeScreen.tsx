import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ route, navigation }: Props) => {
  const { username } = route.params;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome, <Text style={styles.username}>{username}</Text>!
        </Text>
        <Text style={styles.description}>
          You have successfully logged in to the application.
        </Text>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Account</Text>
            <Text style={styles.cardText}>Manage your profile and settings</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardText}>You have 0 new notifications</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            <Text style={styles.cardText}>No recent activity to show</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
  },
  username: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#d9534f',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
