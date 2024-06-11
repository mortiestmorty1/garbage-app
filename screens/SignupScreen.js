import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useGarbage } from '../contexts/GarbageContext';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('customer'); // default role
  const { addUser, getUserByUsername, users } = useGarbage();

  const handleSignup = () => {
    if (!username || !password || !contact || !role) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const existingUser = getUserByUsername(username);
    if (existingUser) {
      Alert.alert("Error", "Username already exists. Please choose a different username.");
      return;
    }

    const newId = Math.max(...users.map(user => parseInt(user.id))) + 1;
    const newUser = { id: newId.toString(), username, password, contact, role };
    addUser(newUser);
    Alert.alert("Success", "User registered successfully.");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <TextInput
        style={styles.input}
        onChangeText={setContact}
        value={contact}
        placeholder="Contact Number"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRole}
        value={role}
        placeholder="Role (admin, driver, customer)"
      />
      <Button title="Signup" onPress={handleSignup} />
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