import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const USER_KEY = '@user_data';
const AUTH_TOKEN_KEY = '@auth_token';

export interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string; // Only stored for demo purposes - in real app use token only
}

export interface AuthToken {
  token: string;
  expiry?: number;
}

export class AuthService {
  /**
   * Store user data in AsyncStorage
   */
  static async storeUser(user: User): Promise<void> {
    try {
      // Remove password before storing
      const safeUser = { ...user };
      delete safeUser.password;

      await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  }

  /**
   * Get stored user data
   */
  static async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Store authentication token
   */
  static async storeToken(token: string, expiry?: number): Promise<void> {
    try {
      const authToken: AuthToken = { token, expiry };
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authToken));
    } catch (error) {
      console.error('Error storing auth token:', error);
      throw error;
    }
  }

  /**
   * Get stored authentication token
   */
  static async getToken(): Promise<string | null> {
    try {
      const authTokenData = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (!authTokenData) return null;

      const authToken: AuthToken = JSON.parse(authTokenData);

      // Check token expiration if expiry exists
      if (authToken.expiry && Date.now() > authToken.expiry) {
        await this.logout(); // Token expired, clear data
        return null;
      }

      return authToken.token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Check if user is logged in
   */
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }

  /**
   * Register a new user
   */
  static async register(user: User): Promise<boolean> {
    try {
      // In a real app, you would call an API here
      // For demo purposes, we'll just store the user locally

      // Generate a mock ID
      const newUser = {
        ...user,
        id: Date.now().toString()
      };

      // Store user data
      await this.storeUser(newUser);

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  /**
   * Login a user with email and password
   */
  static async login(email: string, password: string): Promise<User | null> {
    try {
      // In a real app, you would validate credentials against a server
      // and receive a token. For demo purposes, we'll just:

      // 1. Generate a mock token
      const mockToken = `mock_token_${Date.now()}`;

      // 2. Set token expiry to 7 days from now
      const expiryDate = Date.now() + (7 * 24 * 60 * 60 * 1000);

      // 3. Store the token
      await this.storeToken(mockToken, expiryDate);

      // 4. Create and store basic user data
      const user: User = { email };
      await this.storeUser(user);

      return user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  /**
   * Logout user by clearing stored data
   */
  static async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([USER_KEY, AUTH_TOKEN_KEY]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
