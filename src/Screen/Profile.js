import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);  // State untuk menyimpan data pengguna
  const [loading, setLoading] = useState(true);  // State untuk memuat data
  const [error, setError] = useState(null);  // State untuk error

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          // Jika token tidak ada, tampilkan tampilan login
          setUser(null);  // Set user ke null jika tidak ada token
          setLoading(false);
          return;
        }
        // Jika token ada, ambil data pengguna
        const response = await axios.get('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/auth/whoami', {
          headers: {
            Authorization: `Bearer ${token}`,  // Menyertakan token dalam header
          },
        });
        if (response.data) {
          setUser(response.data.data.user);  // Menyimpan data pengguna
        } else {
          setError('Data pengguna tidak ditemukan.');
        }
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.data.message === 'jwt expired') {
          navigation.navigate('Login');
          setError('Token expired. Silakan login kembali.');
        }
        setError('Gagal memuat data pengguna.');
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [navigation]);  // Pastikan efek dijalankan ulang saat halaman dimuat
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A43333" />
      </View>
    );
  }

  // Jika ada error, tampilkan pesan error
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        // Jika pengguna sudah login, tampilkan data pengguna
        <View style={styles.profileContainer}>
          {/* Avatar pengguna */}
          <Image
            source={{ uri: user.avatar}}
            style={styles.avatar}
          />
          {/* Nama pengguna */}
          <Text style={styles.welcomeMessage}>Selamat datang, {user.fullname}</Text>

          {/* Email pengguna */}
          <Text style={styles.Amail}>Email: {user.email}</Text>

          {/* Tombol logout */}
          <Button
  title="Logout"
  onPress={async () => {
    await AsyncStorage.removeItem('authToken');  // Menghapus token
    // Reset navigasi dan arahkan ke halaman awal yang tidak login
    navigation.reset({
      index: 0,  // Reset ke indeks pertama
      routes: [{ name: 'Profile' }],  // Arahkan ke halaman Profile yang tidak login
    });
  }}
  color="#FF6347"  // Warna merah untuk logout
/>

        </View>
      ) : (
        // Jika belum login, tampilkan pesan
        <View style={styles.container1}>
          <Image
            source={require('../asset/img_car.png')}
            width={120}
            height={80}
            resizeMode="contain"
          />
          <Text style={styles.message1}>UPS, SEPERTINYA ANDA TIDAK LOGIN</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
              color="#28a745"  // Warna hijau
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
              color="#007bff"  // Warna biru
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
    backgroundColor: '#f9f9f9',
  },
  message1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,  // Memberikan jarak antar tombol
    borderRadius: 5,     // Membuat tombol memiliki border radius
    overflow: 'hidden',  // Memastikan border radius terlihat pada tombol
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,  // Menambah efek bayangan pada android
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  Amail: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Profile;
