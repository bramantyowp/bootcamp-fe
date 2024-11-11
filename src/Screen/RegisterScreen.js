import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  // Import axios

function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    setIsLoading(true);

    try {
      // Kirim request POST ke endpoint API untuk registrasi dengan axios
      const response = await axios.post('https://ugly-baboon-brambt8ihpod-c5531254.koyeb.app/api/v1/auth/signup', {
        email,
        password
      });

      // Jika respons sukses, navigasi ke login
      alert('Registration Successful');
      navigation.navigate('Login');
      
    } catch (error) {
      // Tangani error
      if (error.response) {
        // Jika respons error dari server
        if (error.response.status === 409) {
          // Jika email sudah digunakan
          alert('Email is already registered. Please use a different email.');
        } else {
          // Tangani error lainnya
          alert(error.response.data.message || 'Registration failed');
        }
      } else {
        // Jika tidak ada respons atau ada masalah lain (misalnya tidak ada koneksi internet)
        alert('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Ganti teks dengan gambar logo Toyota */}
        <Image
          source={{ uri: 'https://files.klob.id/public/mcois01/kguu8c1v/slider_1.png' }}  // Ganti dengan path gambar logo Toyota Anda
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      
      <Text style={styles.titleInput}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example agung@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#A4A4A4"
      />

      <Text style={styles.titleInput}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: johndee123"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A4A4A4"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#A43333" style={styles.loader} />}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign In here</Text>
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
});

export default RegisterScreen;
