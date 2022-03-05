import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
//Vistas
import LoadingScreen from './src/View/Loading';
import MainScreen from './src/View/Main';
import ConfigurationScreen from './src/View/Configuration'
import UserState from './src/Application/Context/User/UserState';

const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect(()=> {
    SplashScreen.hide()
  },[])
  return (
    <UserState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" options={{ headerShown: false }} component={LoadingScreen} />
          <Stack.Screen name="Main" options={{ headerShown: false }} component={MainScreen} />
          <Stack.Screen name="Config" options={{ headerShown: false }} component={ConfigurationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserState>
  );
}
