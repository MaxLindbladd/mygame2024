import { View, Text, StyleSheet, } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/Store'
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function GameScreen() {

  const counter = useSelector((state: RootState) => state.counter.value);
  const [dice, setDice]= useState (0)

  useEffect(() => {
    if (counter === dice && counter !== 0) {
        setDice(0);
        alert('You won');
    }
}, [counter, dice]);



  return (
    <View style= {styles.container}>
      <Text>noppa game</Text>
      <Text>{counter} points to get</Text>
      <Text>{dice} dice</Text>
      <TouchableOpacity onPress={() => setDice(Math.floor(Math.random() * 6) + 1)}>
      <Text>Roll the dice</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      fontSize: 18,
      marginBottom: 20,
  },
  counterContainer: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
  },
  counter: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  buttonContainer: {
      flexDirection: 'row',
  },
  button: {
      backgroundColor: 'blue',
      color: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginHorizontal: 5,
      borderRadius: 5,
  },
  startContainer: {
      
      padding: 20,
  },
});
