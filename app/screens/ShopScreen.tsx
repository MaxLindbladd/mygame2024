import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/Store';
import { incrementDice } from '../state/slices/upgrades';
import { resetThrows } from '../state/slices/userData';
import { Card } from '../components/Gamescreencomponents/cards';
import { FontAwesome5 } from '@expo/vector-icons';
import { cards } from '../components/Gamescreencomponents/cards';

export default function ShopScreen() {
    const navigation = useNavigation();
    const money = useSelector((state: RootState) => state.UserData.money);
    const diceAmount = useSelector((state: RootState) => state.upgrades.diceAmmount);
    const dispatch = useDispatch();
    const [cardsList, setCardsList] = useState<Card[]>([]);
    const diceModifier = useSelector((state: RootState) => state.upgrades.diceModifier);

    useEffect(() => {
        dispatch(resetThrows());
        generateRandomCards();
    }, []);

    const generateRandomCards = () => {
        const randomCards: Card[] = [];
        const usedIds: number[] = [];
    
        while (randomCards.length < 2) {
            const randomNumber = Math.random() * 100;
            let selectedRarity = '';
    
            if (randomNumber <= 20) selectedRarity = "rare";
            else if (randomNumber <= 80) selectedRarity = "uncommon";
            else selectedRarity = "common";
    
            const eligibleCards = cards.filter(card => card.rarity === selectedRarity);
    
            if (eligibleCards.length > 0) {
                const randomIndex = Math.floor(Math.random() * eligibleCards.length);
                const randomCard = eligibleCards[randomIndex];
    
                if (!randomCards.some(card => card.id === randomCard.id) && !usedIds.includes(randomCard.id)) {
                    randomCards.push(randomCard);
                    usedIds.push(randomCard.id);
                }
            }
        }
    
        setCardsList(randomCards);
    };

    const buyDice = () => {
        dispatch(incrementDice());
        dispatch({ type: 'UserData/decrementMoneyByAmmount', payload: 10 });
    };

    const BuyModifier = () => {
        dispatch({ type: 'UserData/decrementMoneyByAmmount', payload: 5 });
        dispatch({ type: 'upgrades/incrementDiceModifier' });
    };

    const buyCard = (id: number) => {
        setCardsList(cardsList.filter(card => card.id !== id));
        dispatch({type: 'upgrades/addCard', payload: cards.find(card => card.id === id)!})
        dispatch({ type: 'UserData/decrementMoneyByAmmount', payload: cards.find(card => card.id === id)!.price });
    };

    const nextOpponent = () => {
        navigation.navigate("GameScreen");
    };

    const renderCard = ({ item }: { item: Card }) => (
        <TouchableOpacity onLongPress={() => buyCard(item.id)} disabled={item.price > money}>
            <View style={styles.cardContainer}>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <FontAwesome5 name={item.icon} size={24} />
                    <Text style={styles.cardDescription}>{item.description}</Text>
                    <Text style={styles.cardDescription}>Rarity: {item.rarity}</Text>
                    <Text style={styles.cardPrice}>Price: {item.price}€</Text>
                    {item.price > money && <Text style={{ color: 'red' }}>Not enough money</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Shop</Text>
            </View>
            
            <View style={styles.moneyContainer}>
                <Text style={styles.moneyText}>Money: {money}€</Text>
            </View>

            <Text style={styles.sectionTitle}>Buy cards</Text>

            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.flatList}
                    data={cardsList}
                    renderItem={renderCard}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                />
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.text}>Dices: {diceAmount}</Text>
                <Text style={styles.text}>Dice faces: {diceModifier}</Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.text}>Dice price: 10€</Text>
                <Text style={styles.text}>Dice face price: 5€</Text>
            </View>

            <View style={styles.buttonContainer}>
                {diceAmount < 5 && money >= 10 &&
                    <TouchableOpacity onPress={buyDice}>
                        <Text style={styles.button}>Buy dice</Text>
                    </TouchableOpacity>
                }

                {money >= 5 &&
                    <TouchableOpacity onPress={BuyModifier}>
                        <Text style={styles.button}>Buy face </Text>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.nextOpponentContainer}>
                <TouchableOpacity onPress={nextOpponent}>
                    <Text style={styles.button}>Next Opponent</Text>
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
        backgroundColor: '#333',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        position: 'absolute',
        top: 0,
    },
    title: {
        marginTop: 20,
        fontSize: 36,
        color: '#fff',
        
    },
    priceContainer: {
        flexDirection: 'row',
        backgroundColor: '#333',
        padding: 5,
        borderRadius: 10,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    text: {
        fontSize: 16,
        color: '#fff',
        marginHorizontal: 10,
    },
    moneyContainer: {
        backgroundColor: '#333',
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
        position: 'absolute',
        top: 120,
    },
    moneyText: {
        fontSize: 16,
        color: '#fff',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    cardDetails: {
        flex: 1,
        marginLeft: 10,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    cardPrice: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        position: 'absolute',
        bottom: 110,
    },
    button: {
        backgroundColor: '#777',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        color: '#fff',
        marginHorizontal: 10,
    },
    nextOpponentContainer: {
        position: 'absolute',
        bottom: 50,
    },
    flatList: {
        width: '100%',
    },
    flatListContainer: {
        width: '100%',
        height: 200,
    }
});
