import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/Store';
import React from 'react';
import Header from '../components/Homescreencomponents/Header';
import { useNavigation } from '@react-navigation/native'; 
import GameScreen from './GameScreen'; // Korjattu nimi 'GameScreen'
import { resetThrows } from '../state/slices/userData';

export default function HomeScreen() {
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    const navigation = useNavigation(); // Käytetään navigaatiota

    const startGame = () => {
        // Dispatch actions or perform any other necessary logic
        // Navigate to the Game screen
        dispatch(resetThrows());
      
        navigation.navigate("GameScreen"); // Korjattu nimi 'GameScreen'
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.text}>My Dice Game</Text>
            <View style={styles.counterContainer}>
                <Text style={styles.difficultyText}>Difficulty</Text>
                <Text style={styles.counter}>{counter}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => dispatch({type: 'counter/decrement'})}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => dispatch({type: 'counter/increment'})}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    counterContainer: {
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
    },
    difficultyText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    counter: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#777',
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    startButton: {
        backgroundColor: '#00cc00',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    startButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});
