import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CustomerDashboard from '../screens/CustomerDashboard';
import DriverDashboard from '../screens/DriverDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import MarketplacePage from '../screens/market';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Marketplace" component={MarketplacePage} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Customer Dashboard" component={CustomerDashboard} />
        <Stack.Screen name="Driver Dashboard" component={DriverDashboard} />
        <Stack.Screen name="Admin Dashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;