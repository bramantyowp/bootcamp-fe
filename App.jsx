import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Home from './src/Screen/Home';
import ListCar from './src/Screen/ListCar';
import Profile from './src/Screen/Profile';
import RegisterScreen from './src/Screen/RegisterScreen';
import LoginScreen from './src/Screen/LoginScreen';
import DetailScreen from './src/Screen/DetailScreen'; // Import DetailScreen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator for Home, ListCar, and Profile
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A43333', // Red for active tab
        tabBarInactiveTintColor: '#B0B0B0', // Gray for inactive tab
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="List"
        component={ListCar}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="list" size={size} color={color} />,
          headerShown: true, // Show header
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App with Stack Navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        {/* Add DetailScreen to the stack for ListCar */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Car Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
