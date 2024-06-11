import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useGarbage } from '../contexts/GarbageContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useGarbage();

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      switch (user.role) {
        case 'admin':
          navigation.navigate('Admin Dashboard');
          break;
        case 'driver':
          navigation.navigate('Driver Dashboard', { loggedInUserId: user.id });
          break;
        case 'customer':
          navigation.navigate('Customer Dashboard', { loggedInUserId: user.id });
          break;
        default:
          Alert.alert("Login Failed", "Invalid credentials");
          break;
      }
    } else {
      Alert.alert("Login Failed", "User not found");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});