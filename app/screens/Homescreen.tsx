import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/Store';
import React from 'react';
import Header from '../components/Homescreencomponents/Header';
import { useNavigation } from '@react-navigation/native'; 
import GameScreen from './GameScreen'; // Korjattu nimi 'GameScreen'

export default function HomeScreen() {
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigation = useNavigation(); // Käytetään navigaatiota

    const startGame = () => {
      // Dispatch actions or perform any other necessary logic
      // Navigate to the Game screen
      navigation.navigate("GameScreen"); // Korjattu nimi 'GameScreen'
  };


    return (
        <View style={styles.container}>
          <Header />
            <Text style={styles.text}>Homescreen is here and it does work</Text>
            <View style={styles.counterContainer}>
                <Text style={styles.counter}>{counter}</Text>
                <View style={styles.buttonContainer}>
                <Text style={styles.button} onPress={() => dispatch({type: 'counter/decrement'})}>Decrement</Text>
                    <Text style={styles.button} onPress={() => dispatch({type: 'counter/increment'})}>Increment</Text>
                    
                </View>
                
            </View>
            <View style={styles.startContainer}>
                    <Text style={styles.button} onPress={startGame}>Start Game</Text>
                </View>
        </View>
    );
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
