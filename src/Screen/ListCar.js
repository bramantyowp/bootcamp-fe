// Inside ListCar.js
import React, { useEffect, useState } from 'react';
import { FlatList, useColorScheme, View, ActivityIndicator, Text } from 'react-native';
import CarList from '../component/CarList';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function ListCar() {
  const isDarkMode = useColorScheme() === 'dark';
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/cars');
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
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
        <Text>Loading cars...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={({ item }) => {
          const imageUrl = item.img ? item.img.replace(/^'|'$/g, '') : 'https://via.placeholder.com/150';

          return (
            <View style={styles.carItemContainer}>
              <CarList
                onPress={() =>
                  navigation.navigate('Detail', {
                    carName: item.name,
                    carImage: imageUrl,
                    carPrice: item.price,
                    baggage: item.baggage,
                seat:item.seat,
                  })
                }
                key={item.id.toString()}
                image={{ uri: imageUrl }}
                carName={item.name}
                passengers={item.seat}
                baggage={item.baggage}
                price={item.price}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Style and other code remain the same...


const styles = {
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  carItem: {
    flex: 1,
    marginVertical: 1,
  },
  carItemContainer: {
    flex: 1,
    borderRadius: 2,
    overflow: 'hidden',
  },
};

export default ListCar;
