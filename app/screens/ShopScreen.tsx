import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../state/Store';
import { useDispatch } from 'react-redux';
import { incrementDice } from '../state/slices/upgrades';
import { useState, useEffect } from 'react'
import { resetThrows } from '../state/slices/userData';




export default function ShopScreen() {
    const modifier = useSelector((state: RootState) => state.upgrades.diceModifier);
    const navigation = useNavigation(); // Käytetään navigaatiota
    const money = useSelector((state: RootState) => state.UserData.money);
    const diceAmmount = useSelector((state: RootState) => state.upgrades.diceAmmount);
    const dispatch = useDispatch();
    
  
    useEffect(() => {
      // Suoritetaan kun komponentti on ladattu
      
      dispatch(resetThrows()); // Esimerkki toiminnosta komponentin lataamisen yhteydessä
    }, []);
  



    const buyDice = () => {
        console.log("buy dice")
        dispatch(incrementDice());
        dispatch({type: 'UserData/decrementMoneyByAmmount', payload: 10});
    }

    const BuyModifier = () => {
        dispatch({type: 'UserData/decrementMoneyByAmmount', payload: 5});
        dispatch({type: 'upgrades/incrementDiceModifier'});
        console.log("buy modifier")
    }

    const buyCard = () => {
        console.log("buy card")
    }

    const nextOpponent = () => {
        console.log("next opponent")
        navigation.navigate("GameScreen");
    }

  return (
    <View style= {styles.container}>

        <Text>Shop</Text>
        <Text>{money} money</Text>
        <Text> Dice price 10€</Text>
        <Text> Dice Modifier price 5€</Text>
    
        
    <View style={styles.buttonContainer}>

       {diceAmmount < 5 && money >= 10 &&

          <TouchableOpacity onPress={buyDice}>
            <Text style={styles.button}>Buy Dice</Text>
          </TouchableOpacity>
         }

        { money >= 5 &&
<TouchableOpacity onPress={BuyModifier}>
      <Text style={styles.button}>Buy Dice Modifier</Text>
      </TouchableOpacity>
}
      <TouchableOpacity onPress={buyCard}>
      <Text style={styles.button}>Buy Card</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={nextOpponent}>
      <Text style={styles.button}>Next opponent</Text>
      </TouchableOpacity>

      <Text>{diceAmmount} dice</Text>
        <Text>{modifier} dice modifier</Text>
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