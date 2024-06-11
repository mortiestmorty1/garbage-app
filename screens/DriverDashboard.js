import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useGarbage } from '../contexts/GarbageContext';

const DriverDashboard = ({ navigation, route }) => {
  const { garbageList, updateListingStatus, getUserById } = useGarbage();
  const loggedInUserId = route.params.loggedInUserId;  // Get the logged-in user ID dynamically

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>Type: {item.type}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Address: {item.address}</Text>
      {item.customer_name && (
        <>
          <Text>Customer Name: {item.customer_name}</Text>
          <Text>Customer Contact: {item.customer_contact}</Text>
        </>
      )}
      {item.driver_name && (
        <>
          <Text>Driver Name: {item.driver_name}</Text>
          <Text>Driver Contact: {item.driver_contact}</Text>
        </>
      )}
      {item.status === 'open' && (
        <Button title="Accept" onPress={() => updateListingStatus(item.id, 'accepted', loggedInUserId)} />
      )}
      {item.status === 'accepted' && item.driver_id === loggedInUserId && (
        <Button title="Pick Up" onPress={() => updateListingStatus(item.id, 'picked up')} />
      )}
      {item.status === 'picked up' && item.driver_id === loggedInUserId && (
        <Button title="Deliver" onPress={() => updateListingStatus(item.id, 'delivered')} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Garbage Listings</Text>
      <FlatList
        data={garbageList.filter(item => item.status !== 'delivered')}
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
});

export default DriverDashboard;