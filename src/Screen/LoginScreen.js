import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Gagal', error);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/auth/signin', {
        email,
        password,
      });
console.log(response.data);
      const { token, message } = response.data.data;

      if (token) {
        await AsyncStorage.setItem('authToken', token);
        setTimeout(() => {
          navigation.navigate('HomeTabs', { screen: 'Profile' });
        }, 100);
      } else {
        setError(message || 'Login gagal. Token tidak ditemukan.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
          source={{ uri: 'https://files.klob.id/public/mcois01/kguu8c1v/slider_1.png' }}  // Ganti dengan path gambar logo Toyota Anda
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.title}>Login</Text>

      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Text style={styles.titleX}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example agung@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#A4A4A4"
      />
<Text style={styles.titleX}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: johndee123"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A4A4A4"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text style={styles.registerButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signInText}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: -30,
    left: -10,
    width: '100%',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  titleX: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  titleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  signInText: {
    fontSize: 16,
    color: '#0000FF',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
