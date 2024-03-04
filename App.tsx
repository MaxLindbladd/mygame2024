import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/Homescreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './app/state/Store';
import GameScreen from './app/screens/GameScreen';
import ShopScreen from './app/screens/ShopScreen';

const Stack = createStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              headerShown: false // Piilottaa oletusotsikon
            }} 
          />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ headerShown: false }} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
