import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);  // State untuk menyimpan data pengguna
  const [loading, setLoading] = useState(true);  // State untuk memuat data
  const [error, setError] = useState(null);  // State untuk error

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          // Jika token tidak ada, arahkan ke halaman login
          navigation.navigate('Login');
          setLoading(false);
          return;
        }

        // Jika token ada, ambil data pengguna
        const response = await axios.get('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Menyertakan token dalam header
          },
        });

        if (response.data) {
          console.log(response.data);
          setUser(response.data);  // Menyimpan data pengguna
        } else {
          setError('Data pengguna tidak ditemukan.');
        }

        setLoading(false);  // Selesai memuat data
      } catch (error) {
        setError('Gagal memuat data pengguna.');
        setLoading(false);
      }
    };

    checkLoginStatus();  // Panggil fungsi saat pertama kali render
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');  // Menghapus token dari penyimpanan
    navigation.navigate('Login');  // Arahkan ke halaman login setelah logout
  };

  // Jika loading, tampilkan indikator loading
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
            source={{ uri: user.avatar || 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
          {/* Nama pengguna */}
          <Text style={styles.welcomeMessage}>Selamat datang, {user.fullname}</Text>

          {/* Email pengguna */}
          <Text style={styles.email}>Email: {user.email}</Text>

          {/* Tombol logout */}
          <Button
            title="Logout"
            onPress={handleLogout}  // Fungsi logout dipanggil saat tombol ditekan
            color="#FF6347"  // Warna merah untuk tombol logout
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
  email: {
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
