import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Home from './src/Screen/Home';
import ListCar from './src/Screen/ListCar';
import Profile from './src/Screen/Profile';
import RegisterScreen from './src/Screen/RegisterScreen'; // Import RegisterScreen
import LoginScreen from './src/Screen/LoginScreen'; // Import LoginScreen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create Stack Navigator

// Fungsi untuk menampilkan tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A43333', // Merah untuk tab aktif
        tabBarInactiveTintColor: '#B0B0B0', // Abu-abu untuk tab tidak aktif
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
        name="List"
        component={ListCar}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Halaman utama yang berisi TabNavigator */}
        <Stack.Screen
          name="HomeTabs" // Nama Tab Navigator
          component={TabNavigator}
          options={{ headerShown: false }} // Menyembunyikan header Tab
        />
        {/* Halaman Register */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }} // Judul halaman Register
        />
        {/* Halaman Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }} // Judul halaman Login
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
