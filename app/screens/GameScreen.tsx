import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../state/Store';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';



export default function GameScreen() {
  const navigation = useNavigation(); // Käytetään navigaatiota
  const difficulty = useSelector((state: RootState) => state.counter.value);
  const diceAmount = useSelector((state: RootState) => state.upgrades.diceAmmount); // Haetaan diceAmmount Redux-tilasta
  const [diceValues, setDiceValues] = useState<number[]>(Array.from({ length: diceAmount }, () => 0));
  const [score, setScore] = useState(0);
  const opponentLevel = useSelector((state: RootState) => state.upgrades.opponentLevel);
  const goal = difficulty + opponentLevel * 20;
  const dispatch = useDispatch();
  const money = useSelector((state: RootState) => state.UserData.money);
  const throws = useSelector((state: RootState) => state.UserData.throws);
  const diceModifier = useSelector((state: RootState) => state.upgrades.diceModifier);


  const rollDice = () => {
    const newDiceValues = diceValues.map(() => Math.floor(Math.random() * 6) + (1 * diceModifier));
    setDiceValues(newDiceValues);
    const totalScore = newDiceValues.reduce((acc, currentValue) => acc + currentValue, 0);
    setScore(prevScore => prevScore + totalScore);
    dispatch({type: 'UserData/decrementthrows'});
  };

  useEffect(() => {
    if (score >= goal ) {
      alert('You won! your score was'+ score);
      setScore(0);
      navigateToShop();
      dispatch({type: 'upgrades/incrementOpponentLevel'});
      dispatch({type: 'UserData/incrementMoneyByAmmount', payload: (throws*5)});
    }
  }, [diceValues, diceAmount]);

  useEffect(() => {
    setDiceValues(Array.from({ length: diceAmount }, () => 0));
  }
  , [diceAmount]);

useEffect(() => {
  if (throws === 0 && score < goal) {
    alert('You lost!');
    setScore(0);
    navigateToHome();
    dispatch({type: 'upgrades/resetUpgrades'});
  }
  }, [throws]);

  


  const navigateToShop = () => {
    navigation.navigate("ShopScreen"); // Korjattu nimi 'GameScreen'
  };


  const navigateToHome = () => {
    navigation.navigate("Home"); // Korjattu nimi 'GameScreen'
  }

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Text>noppa game</Text>
        <Text>{goal} points to get</Text>
      </View>
      <View style={styles.buttonContainer}>
      {diceValues.map((value, index) => (
        <Text key={index}>{`Dice ${index + 1}: ${value}`}</Text>
      ))}
      </View>
      <Text>Score = {score}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={rollDice}>
          <Text style={styles.button}>Roll the dice</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToShop}>
        <Text style={styles.button}>Shop</Text>
      </TouchableOpacity>

      
      <Text>{throws} throws</Text>
      <Text>{diceAmount} bugimetsästy noppa</Text>
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
    padding: 50,
  },
  counter: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
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
