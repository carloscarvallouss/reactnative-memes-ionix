import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Vistas
import LoadingScreen from './src/View/Loading';
import MainScreen from './src/View/Main';
import ConfigurationScreen from './src/View/Configuration'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" options={{ headerShown: false }} component={LoadingScreen} />
        <Stack.Screen name="Main" options={{ headerShown: false }} component={MainScreen} />
        <Stack.Screen name="Config" options={{ headerShown: false }} component={ConfigurationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
