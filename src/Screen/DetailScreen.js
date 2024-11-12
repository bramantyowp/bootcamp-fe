import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function DetailScreen({ route }) {
  const { carId, carName, carImage, carPrice, passengers, baggage } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: carImage }} style={styles.image} />
      <Text style={styles.title}>{carName}</Text>
      <Text>Price: ${carPrice}</Text>
      <Text>Passengers: {passengers}</Text>
      <Text>Baggage: {baggage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DetailScreen;
