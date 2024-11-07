import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Button from '../component/button';
import Icon from 'react-native-vector-icons/Feather';
import CarList from '../component/CarList';
import axios from 'axios';

const COLORS = {
  primary: '#A43333',
  secondary: '#5CB85F',
  lighter: '#ffffff',
  lightGreen: '#90EE90',  // Warna hijau muda
  darker: '#121212',
  hitam: '#fff',
};

const ButtonIcon = ({ icon, title }) => (
  <View style={styles.buttonIcon}>
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={25} color="#fff" />
    </View>
    <Text style={styles.iconText}>{title}</Text>
  </View>
);

function Home() {
  const isDarkMode = useColorScheme() === 'dark';
  const [cars, setCars] = useState([]);

  // Fetching data menggunakan useEffect dan axios
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/cars');
        console.log(res.data);
        setCars(res.data.data);  // Menyimpan data mobil ke state
      } catch (e) {
        console.log(e); // Menangani error jika fetch gagal
      }
    };
    fetchCars();
  }, []);  // Dependency array kosong berarti hanya dipanggil sekali saat komponen pertama kali dimuat

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>Hi, Nama</Text>
              <Text style={styles.headerTextLocation}>Your Location</Text>
            </View>
            <View>
              <Image
                style={styles.imageRounded}
                source={{ uri: 'https://i.pravatar.cc/100' }}
                width={50}
                height={50}
              />
            </View>
          </View>
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <View style={styles.bannerDesc}>
              <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
              <Button color={COLORS.lightGreen} title="Sewa Mobil" />
            </View>
            <View style={styles.bannerImage}>
              <Image
                source={require('../asset/img_car.png')}
                width={120}
                height={80}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Icon Buttons */}
        <View style={styles.iconContainer}>
          <ButtonIcon icon="truck" title="Sewa Mobil" />
          <ButtonIcon icon="box" title="Oleh-Oleh" />
          <ButtonIcon icon="key" title="Penginapan" />
          <ButtonIcon icon="camera" title="Wisata" />
        </View>

        <Text style={styles.ListText}>Daftar Mobil Pilihan</Text>

        {/* FlatList for Cars */}
        <FlatList
          data={cars}  // Data yang diambil dari state `cars`
          renderItem={({ item }) => {
            // Memastikan gambar memiliki URL yang valid, atau fallback ke placeholder
            const imageUrl = item.img ? item.img.replace(/^'|'$/g, '') : 'https://via.placeholder.com/150';
            return (
              <CarList
                key={item.id.toString()}  // Unik ID untuk setiap item
                image={{ uri: imageUrl }}  // Menampilkan gambar mobil
                carName={item.name}  // Nama mobil
                passengers={5}  // Jumlah penumpang (sesuaikan jika perlu)
                baggage={4}  // Kapasitas bagasi (sesuaikan jika perlu)
                price={item.price}  // Harga mobil (dari API)
              />
            );
          }}
          keyExtractor={item => item.id.toString()}  // Setiap item membutuhkan key unik
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingBottom: 10,
    paddingHorizontal: 15,
    height: 170,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  imageRounded: {
    borderRadius: 25,
  },
  headerText: {
    color: COLORS.lighter,
    fontWeight: '700',
    fontSize: 14,
  },
  ListText: {
    color: 'black',
    fontSize: 20,
    padding: 8,
    fontWeight: '900',
  },
  headerTextLocation: {
    color: COLORS.lighter,
    fontWeight: '700',
    fontSize: 12,
  },
  bannerContainer: {
    backgroundColor: '#AF392F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  bannerDesc: {
    flex: 1,
  },
  bannerText: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lighter,
  },
  bannerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 5,
    flexWrap: 'wrap',
    paddingTop: 50,
  },
  buttonIcon: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'black',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 12,
  },
  footerTextActive: {
    color: COLORS.primary,
    fontSize: 12,
  },
});

export default Home;
