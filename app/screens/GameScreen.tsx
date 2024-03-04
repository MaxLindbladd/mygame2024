import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/Store';
import { useNavigation } from '@react-navigation/native';

export default function GameScreen() {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.counter.value);
  const diceAmount = useSelector((state: RootState) => state.upgrades.diceAmmount);
  const [diceValues, setDiceValues] = useState<number[]>(Array.from({ length: diceAmount }, () => 0));
  const [score, setScore] = useState(0);
  const opponentLevel = useSelector((state: RootState) => state.UserData.opponentLevel);
  const goal = difficulty + opponentLevel **3;
  const money = useSelector((state: RootState) => state.UserData.money);
  const throws = useSelector((state: RootState) => state.UserData.throws);
  const cards = useSelector((state: RootState) => state.upgrades.cards); // Lisätty kortit
  const diceModifier = useSelector((state: RootState) => state.upgrades.diceModifier);
  
  
  const rollDice = () => {
    dispatch({ type: 'UserData/decrementthrows' });
    const baseDiceValues = diceValues.map(() => Math.floor(Math.random() * diceModifier) + 1);
    const modifiedValues = baseDiceValues.map(value => value);
    
    setDiceValues(modifiedValues);
  
    const sum = modifiedValues.reduce((a, b) => a + b, 0);
    const newScore = score + sum;
    setScore(newScore);

    
    console.log('cards', cards);
    //console.log('baseDiceValues', baseDiceValues);
    console.log('modifiedValues', modifiedValues);
    console.log('diceModifier', diceModifier);
    console.log('sum', sum);
    console.log('score', score);
    console.log('newScore', newScore);
    console.log("throws", throws);
    console.log("nyt on normi nopat laskettuuuuuuuuuuuuuuuuuuu");

    calculateCards(cards, baseDiceValues, sum,);
  }
  

  const calculateCards = (cards: any[], baseDiceValues: number[], sum: number) => {
    let newScore = score; // Alusta uusi pistemäärä nykyisellä pistemäärällä
  
    if (cards.length > 0) {
      cards.forEach((card) => {
        const modifier = card.modifier[0] as number;
        const sameNumber = card.modifier[1] as number;
        const counts: { [key: number]: number } = {};
        baseDiceValues.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
        const maxCount = Math.max(...Object.values(counts));
  
        console.log('sum', sum);
        console.log('modifier', modifier);
        console.log('card', card);
        console.log("score1", newScore); // Käytä newScore muuttujaa
  
        if (sameNumber <= maxCount) {
          sum *= modifier;
          console.log('summod', sum);
        }
  
        console.log("score2", newScore);
      });
      setScore(score+sum); 
    }
  
    // Päivitä pistemäärä kerran kaikkien korttien käsittelyn jälkeen
  }
  
  
  
  
  
  useEffect(() => {
    if (score >= goal && opponentLevel < 10) {
      
      alert('You won this round! Your score was ' + score);

      setTimeout(() => {
      setScore(0);
      navigateToShop();
      dispatch({type: 'upgrades/incrementOpponentLevel'});
      dispatch({type: 'UserData/incrementMoneyByAmmount', payload: (throws*5)});
      dispatch({type: 'UserData/incrementOpponentLevel'});
      }
      , 1500);
    
  }
  }, [diceValues, diceAmount,score]);
  
  useEffect(() => {
    setDiceValues(Array.from({ length: diceAmount }, () => 0));
  }, [diceAmount]);
  
  useEffect(() => {
    if (throws === 0 && score < goal) {
      alert('You lost!');
      setScore(0);
      navigateToHome();
      dispatch({type: 'upgrades/resetUpgrades'});
      dispatch({type: 'UserData/resetOpponentLevel'});
    }
  }, [throws]);
  
  useEffect(() => {
    if (opponentLevel === 10 && score >= goal) {
      alert('You won the game! Buy full version');
      setScore(0);
      navigateToHome();
      dispatch({type: 'upgrades/resetUpgrades'});
      dispatch({type: 'UserData/resetOpponentLevel'});
    }
  }, [opponentLevel, diceValues]);
  
  const navigateToShop = () => {
    navigation.navigate("ShopScreen");
  };
  
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  
   return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Dice Game</Text>
          </View>

          <View style={styles.opponentContainer}>
          <Text style={styles.text}>Opponent Level: {opponentLevel}</Text>
          
            <Text style={styles.text}>{goal} points to get</Text>
          </View>

            <View style={styles.diceContainer}>
            {diceValues.map((value, index) => (
                    <View key={index} style={styles.dice}>
                        <Text key={index} style={styles.diceText}>{value}</Text>
                    </View>
                    // You can replace the empty View with images or animations representing dice faces
                ))}
            </View>
            <Text style={styles.text}>Score = {score}</Text>


            
            <View style={styles.buttonContainer}>
            <Text style={styles.text}>{throws} throws</Text>
                <TouchableOpacity onPress={rollDice}>
                    <Text style={styles.button}>Roll the dice</Text>
                </TouchableOpacity>
                
            </View>
            
       
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
    headerContainer: {
      position: 'absolute',
      top: 0,
      backgroundColor: '#333',
      width: '100%',
      alignItems: 'center',
      padding: 20,
  },
    opponentContainer: {
      flexDirection: 'row',
      backgroundColor: '#333',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'space-between',
      borderRadius: 10,
      position: 'absolute',
      top: 120,
      width: '80%',

  },
    title: {
        fontSize: 36,
        color: '#fff',
        marginTop: 20,
    },
    diceContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dice: {
        width: 50,
        height: 50,
        backgroundColor: '#333',
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        color: '#fff',
        paddingVertical: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
    },
    button: {
        backgroundColor: '#777',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        color: '#fff',
    },
    diceText: {
      fontSize: 14,
      color: '#fff',
  },
});