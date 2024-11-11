import React, { useEffect, useState } from 'react';
import {
  FlatList,
  useColorScheme,
  View,
  ActivityIndicator, // To show a loading spinner
  Text, // To show an error message
} from 'react-native';
import CarList from '../component/CarList';
import axios from 'axios';

function ListCar() {
  const isDarkMode = useColorScheme() === 'dark';
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/cars');
        console.log(res.data);
        setCars(res.data.data); // Store car data in state
        setLoading(false); // Stop loading after data is fetched
      } catch (e) {
        console.log(e);
        setError('Failed to fetch cars. Please try again later.');
        setLoading(false); // Stop loading even if there’s an error
      }
    };

    fetchCars();
  }, []); // Empty dependency array, so this runs only once when the component mounts

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
        <Text>Loading cars...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cars} // The cars data from state
        renderItem={({ item }) => {
          // Ensure the image URL is valid, or use a placeholder
          const imageUrl = item.img ? item.img.replace(/^'|'$/g, '') : 'https://via.placeholder.com/150';
          return (
            <CarList
              key={item.id.toString()} // Unique ID for each item
              image={{ uri: imageUrl }} // Display car image
              carName={item.name} // Display car name
              passengers={5} // Number of passengers (adjust as needed)
              baggage={4} // Baggage capacity (adjust as needed)
              price={item.price} // Price from API
            />
          );
        }}
        keyExtractor={item => item.id.toString()} // Key for each list item
      />
    </View>
  );
}

export default ListCar;
