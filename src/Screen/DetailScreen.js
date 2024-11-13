// Inside DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
function DetailScreen({ route }) {
  // Destructure car details from route.params
  const { carName, carImage, carPrice, seat, baggage } = route.params;
  const md = `## Include
  
  - Apa saja yang termasuk dalam paket misal durasi max 12 jam
  - Sudah termasuk bensin selama 12 jam
  - Sudah termasuk Tiket Wisata
  - Sudah termasuk pajak
  
  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan`.toString();
  const handlePayment = () => {
    Alert.alert('Pembayaran', 'Proceeding to payment...');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Text style={styles.title}>{carName}</Text>
          {/* Menampilkan informasi penumpang dan bagasi */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Penumpang</Text>
              <Text style={styles.infoValue}>{seat} Orang</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Bagasi</Text>
              <Text style={styles.infoValue}>{baggage} Liter</Text>
            </View>
          </View>
          <Image
            source={{ uri: carImage }}
            style={styles.carImage}
          />
        </View>

        <View style={styles.detailsContainer}>
        <Markdown style={styles.detailsContainer}>{md.replace(/\\n/g,"\n")}</Markdown>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>Rp {carPrice}</Text>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 100, // Memberikan ruang untuk footer jika konten sedikit
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  carImage: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  detailsContainer: {
    width: '95%',
    height: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#fff', // Pastikan backgroundnya putih
    shadowColor: '#000', // Warna shadow (hitam)
    shadowOffset: { width: 0, height: 2 }, // Posisi shadow
    shadowOpacity: 0.25, // Transparansi shadow
    shadowRadius: 3.5, // Ukuran blur shadow
    elevation: 5, // Hanya untuk Android
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  item: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f1f1f1', // Warna latar belakang yang lebih cerah
    paddingVertical: 15,
    alignItems: 'flex-start',  // Untuk membuat harga align ke kiri
    justifyContent: 'center',
    paddingLeft: 20,  // Memberikan jarak dari sisi kiri
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',  // Warna teks harga menjadi gelap agar kontras
    marginBottom: 10,
  },
  paymentButton: {
    width: '95%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
