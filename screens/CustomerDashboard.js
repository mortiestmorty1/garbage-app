import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useGarbage } from '../contexts/GarbageContext';

const CustomerDashboard = ({ route }) => {
  const { garbageList, addListing, getUserById } = useGarbage();
  const loggedInUserId = route.params.loggedInUserId;

  const [newType, setNewType] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const addNewListing = () => {
    if (!newType || !newWeight || !newPrice || !newAddress) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const customer = getUserById(loggedInUserId);
    if (!customer) {
      Alert.alert("Error", "Customer not found");
      return;
    }

    const newId = garbageList.length === 0 ? 1 : Math.max(...garbageList.map(item => parseInt(item.id))) + 1;
    const newListing = {
      id: newId.toString(),
      customer_id: loggedInUserId,
      customer_name: customer.username,
      customer_contact: customer.contact,
      driver_id: null,
      driver_name: null,
      driver_contact: null,
      type: newType,
      recyclable: true,
      weight: `${newWeight} kg`,
      price: `$${newPrice}`,
      status: 'open',
      address: newAddress
    };
    addListing(newListing);
    setNewType('');
    setNewWeight('');
    setNewPrice('');
    setNewAddress('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Type: {item.type}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Status: {item.status}</Text>
      {item.driver_name ? (
        <>
          <Text>Driver Name: {item.driver_name}</Text>
          <Text>Driver Contact: {item.driver_contact}</Text>
        </>
      ) : (
        <Text>Driver: Not accepted yet</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Garbage Listings</Text>
      <Picker
        selectedValue={newType}
        onValueChange={(itemValue) => setNewType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Plastic" value="Plastic" />
        <Picker.Item label="Organic" value="Organic" />
        <Picker.Item label="Metal" value="Metal" />
      </Picker>
      <TextInput placeholder="Weight (kg)" value={newWeight} onChangeText={setNewWeight} style={styles.input} />
      <TextInput placeholder="Price ($)" value={newPrice} onChangeText={setNewPrice} style={styles.input} />
      <TextInput placeholder="Address" value={newAddress} onChangeText={setNewAddress} style={styles.input} />
      <Button title="Add New Listing" onPress={addNewListing} />
      <FlatList
        data={garbageList.filter(item => item.customer_id === loggedInUserId)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CustomerDashboard;