import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

export default function Button({ title, children, onPress, style }) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, style]} // Menerima dan meneruskan prop `style`
    >
      {children ? children : <Text style={styles.buttonText}>{title || 'Button'}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,  // Agar tombol lebih cantik dengan sudut melengkung
    justifyContent: 'center', // Vertikal center text
    alignItems: 'center', // Horizontal center text
    backgroundColor: 'green',
    width: '60%',
  },
  buttonText: {
    color: '#fff', // Pastikan teks berwarna putih agar kontras dengan latar belakang
    fontWeight: 'bold',
    fontSize: 14,
  },
});
