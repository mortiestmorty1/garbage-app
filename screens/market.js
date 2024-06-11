import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const MarketplacePage = () => {
  const [pickups, setPickups] = useState([
    {
      id: 1,
      type: 'Home',
      description: 'Schedule a pickup from your home',
      image: require('./Home.png'),
    },
    {
      id: 2,
      type: 'Business',
      description: 'Schedule a pickup from your business',
      image: require('./business.png'),
    },
    {
      id: 3,
      type: 'Industry',
      description: 'Schedule a pickup from your industry',
      image: require('./Industry.png'),
    },
  ]);

  const handleSchedulePickup = (pickupType) => {
    // Implement pickup scheduling logic here
    console.log(`Scheduling pickup for ${pickupType}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recyclear Marketplace</Text>
        <Text style={styles.subtitle}>Convenient pickups for a greener tomorrow</Text>
      </View>

      <View style={styles.pickupsContainer}>
        {pickups.map((pickup, index) => (
          <View key={index} style={styles.pickupCard}>
            <Image source={pickup.image} style={styles.pickupImage} />
            <Text style={styles.pickupType}>{pickup.type}</Text>
            <Text style={styles.pickupDescription}>{pickup.description}</Text>
            <Button
              mode="contained"
              style={styles.scheduleButton}
              onPress={() => handleSchedulePickup(pickup.type)}
            >
              Schedule Pickup
            </Button>
          </View>
        ))}
      </View>

      <View style={styles.ecoSection}>
        <Text style={styles.ecoTitle}>Why Recycle with Recyclear?</Text>
        <Text style={styles.ecoText}>
          By recycling with Recyclear, you're helping to conserve natural resources, reduce energy consumption, and mitigate climate change. Together, we can make a difference!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  pickupsContainer: {
    marginBottom: 20,
  },
  pickupCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  pickupImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  pickupType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickupDescription: {
    fontSize: 14,
    color: 'gray',
  },
  scheduleButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  ecoSection: {
    marginBottom: 20,
  },
  ecoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ecoText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MarketplacePage;