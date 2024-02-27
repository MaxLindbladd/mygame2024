import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Constants from "expo-constants";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pokergame</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log("Settings button pressed")}>
      <FontAwesome5 name="user-cog" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    width: Dimensions.get('screen').width,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingVertical: 10,
    top: 0,
    left: 0,
    zIndex: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});