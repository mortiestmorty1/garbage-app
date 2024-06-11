import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GarbageProvider } from './contexts/GarbageContext';

export default function App() {
  return (
    <GarbageProvider>
        <AppNavigator />
    </GarbageProvider>
);
}