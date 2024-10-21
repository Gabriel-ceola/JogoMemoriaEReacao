import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicio from './telas/TelaInicial';
import TelaJogoMemoria from './telas/JogoMemoria';
import TelaJogoReacao from './telas/JogoReacao';
import TelaJogoFormato from './telas/JogoFormato';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicio} />
        <Stack.Screen name="JogoMemoria" component={TelaJogoMemoria} />
        <Stack.Screen name="JogoReacao" component={TelaJogoReacao} />
        <Stack.Screen name="JogoFormato" component={TelaJogoFormato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
