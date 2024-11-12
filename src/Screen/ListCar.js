import React, { useEffect, useState } from 'react';
import {
  FlatList,
  useColorScheme,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity, // To make each item clickable
} from 'react-native';
import CarList from '../component/CarList';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function ListCar() {
  const isDarkMode = useColorScheme() === 'dark';
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/cars');
        console.log(res.data);
        setCars(res.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError('Failed to fetch cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

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
        data={cars}
        renderItem={({ item }) => {
          const imageUrl = item.img ? item.img.replace(/^'|'$/g, '') : 'https://via.placeholder.com/150';

          return (
            <TouchableOpacity
  onPress={() => {
    console.log('Item pressed!');
    navigation.navigate('Detail', {
      carId: item.id,
      carName: item.name,
      carImage: imageUrl,
      carPrice: item.price,
      passengers: 5,
      baggage: 4,
    });
  }}
  style={{ flex: -10}} // Pastikan TouchableOpacity memiliki ukuran yang tepat
>
  <CarList
    key={item.id.toString()}
    image={{ uri: imageUrl }}
    carName={item.name}
    passengers={5}
    baggage={4}
    price={item.price}
  />
</TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default ListCar;
