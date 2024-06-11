import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useGarbage } from '../contexts/GarbageContext';

const AdminDashboard = () => {
  const { garbageList, updateListingStatus, getUserById } = useGarbage();

  const handleCancel = (id) => {
    updateListingStatus(id, 'cancelled');
  };

  const renderItem = ({ item }) => {
    const customer = getUserById(item.customer_id);
    const driver = item.driver_id ? getUserById(item.driver_id) : null;

    return (
      <View style={styles.listItem}>
        <Text>Type: {item.type}</Text>
        <Text>Weight: {item.weight}</Text>
        <Text>Price: {item.price}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Address: {item.address}</Text>
        {customer && (
          <>
            <Text>Customer Name: {customer.username}</Text>
            <Text>Customer Contact: {customer.contact}</Text>
          </>
        )}
        {item.driver_id ? (
          driver && (
            <>
              <Text>Driver Name: {driver.username}</Text>
              <Text>Driver Contact: {driver.contact}</Text>
            </>
          )
        ) : (
          <>
            <Text>Driver Name: Not accepted yet</Text>
            <Text>Driver Contact: Not accepted yet</Text>
          </>
        )}
        {item.status === 'open' && (
          <Button title="Cancel Order" onPress={() => handleCancel(item.id)} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Listings</Text>
      <FlatList
        data={garbageList}
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

export default AdminDashboard;