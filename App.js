import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { HomeScreen } from './components/HomeScreen'
import { CalculatorsScreen } from './components/CalculatorsScreen';
import { Context } from './Context'

const Drawer = createDrawerNavigator();

export default function App() {
  const [test, setTest] = useState('')
  return (
      <Context.Provider value={{test, setTest}}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">        
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Drawer.Screen name="Calculators" component={CalculatorsScreen} options={{ title: 'Calculators' }} />
          </Drawer.Navigator>
            <StatusBar style="auto" />    
        </NavigationContainer>
      </Context.Provider>
  );
}