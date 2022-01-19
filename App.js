import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { HomeScreen } from './components/HomeScreen'
import { ConversionScreen } from './components/ConversionScreen';
import { FractionScreen } from './components/FractionScreen';
import { AngleScreen } from './components/AngleScreen';
import LevelScreen from './components/LevelScreen';
import WeightScreen from './components/WeightScreen';
import WorkOrderTrackerScreen from './components/WorkOrderTrackerScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const [test, setTest] = useState('')
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">        
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Drawer.Screen name="Conversions" component={ConversionScreen} options={{ title: 'Conversions' }} />
          <Drawer.Screen name="Angles" component={AngleScreen} options={{ title: 'Angles' }} />
          <Drawer.Screen name="Fractional Calculator" component={FractionScreen} options={{ title: 'Fractions' }} />
          <Drawer.Screen name="Gyroscope Level" component={LevelScreen} options={{ title: 'Level' }} />
          <Drawer.Screen name="Weight of Steel Calculator" component={WeightScreen} options={{ title: 'Steel Weight' }} />
          <Drawer.Screen name="Work Order Tracker" component={WorkOrderTrackerScreen} options={{ title: 'Work Order Tracker' }} />
        </Drawer.Navigator>
          <StatusBar style="auto" />    
      </NavigationContainer>
  );
}