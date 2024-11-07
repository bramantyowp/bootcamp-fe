import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Home from './src/Screen/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name="home"
                size={25}
                color={focused ? '#A43333' : '#FFFFFF'} // Merah ketika tab aktif, putih ketika tidak aktif
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name="list"
                size={25}
                color={focused ? '#A43333' : '#FFFFFF'} // Merah ketika tab aktif, putih ketika tidak aktif
              />
            ),
          }}
          name="List"
          component={() => <View>List</View>}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name="user"
                size={25}
                color={focused ? '#A43333' : '#FFFFFF'} // Merah ketika tab aktif, putih ketika tidak aktif
              />
            ),
          }}
          name="Profile"
          component={() => <View>Profile</View>}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
